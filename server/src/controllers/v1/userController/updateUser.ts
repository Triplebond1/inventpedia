import bcrypt from "bcryptjs";
import User from "../../../models/user";
import { Response } from "express";
import AuthRequest from "../../../types/authRequest";
import { status } from "../../../utilities/enums/statusCode";
import { IUser } from "../../../models/user";
import { validateField } from "../../../utilities/helpers/validateField";

// @desc    Update an existing user
// @route   PUT /v1/api/users/:id
// @access  Private (Admin and the user themselves)
export const updateUserHandler = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.params.id;
    let { username, email, password, role }: IUser = req.body;

    // Validate input fields
    validateField(username, "Username", "string");
    validateField(email, "Email", "string");
    validateField(password, "Password", "string");
    validateField(role, "Role", "string");
    validateField(userId, "user ID", "string")

    // Convert fields to lowercase where necessary
    username ? username.toLowerCase() : null;
    email ? email.toLowerCase() : null;
    role ? role.toLowerCase() : null;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(status.NotFound).json({ message: "User not found" });
    }

    if (!userId) {
      return res.status(status.BadRequest).json({message: "ID is required"})
    }

    // Authorization check: only admin or the user can update their data
    if (req.user?.role !== "admin" && req.user?.id !== userId) {
      return res.status(status.AccessDenied).json({ message: "Access denied" });
    }

    // Password validation
    if (password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(status.BadRequest).json({
          message:
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    // Only admin can update the role
    if (req.user?.role === "admin" && role) {
      user.role = role;
    }

    await user.save();

    return res.status(status.Success).json({
      message: "User updated successfully",
      user: user.toJSON(),
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return res
      .status(status.ServerError)
      .json({ message: "Internal server error", error: error.message });
  }
};
