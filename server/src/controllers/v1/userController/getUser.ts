import { Request, Response } from "express";
import User from "../../../models/user";
import { status } from "../../../utilities/enums/statusCode";
import { validateField } from "../../../utilities/helpers/validateField";

// @desc    Get a single user by ID
// @route   GET /v1/api/users/:id
// @access  Private (Admin and the user themselves)
export const getUserHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.id;

    validateField(userId, "user ID", "string");

    // // Check if the requester is admin or the user themselves
    // if (req.user.role !== "admin" || req.user._id.toString() !== userId) {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    // Find user by ID and exclude password from the result
    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(status.NotFound).json({ message: "User not found" });
      return;
    }

    // Return the user data
    res.status(status.Success).json(user);
    return;
  } catch (error) {
    res
      .status(status.ServerError)
      .json({ message: "Internal server error", error });
      return;
  }
};
