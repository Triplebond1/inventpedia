import User from "../../../models/user";
import { Response } from "express";
import AuthRequest from "../../../types/authRequest";
import { status } from "../../../utilities/enums/statusCode";
import { validateField } from "../../../utilities/helpers/validateField";


// @desc    Delete a user
// @route   DELETE /v1/api/users/:id
// @access  Private (Admin only)
export const deleteUserHandler = async (req:AuthRequest, res:Response): Promise<Response> => {
  try {
    const userId = req.params.id;
    
    validateField(userId, "user ID", "string")

    // Authorization: Only admin can delete users
    if (req.user?.role !== "admin") {
      return res.status(status.AccessDenied).json({ message: "Access denied" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(status.NotFound).json({ message: "User not found" });
    }

    // Remove the user
    const deleted = await user.deleteOne();
    if (!deleted) {
      return res.status(status.Unauthorized).json({ message: "unable to delete user" });
    }

    // Send success response
    return res.status(status.Success).json({ message: "User deleted successfully" });
  } catch (error: any) {
    // Internal server error response
    return res.status(status.ServerError).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
