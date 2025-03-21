import User from "../../../models/user";
import { Response } from "express";
import AuthRequest from "../../../types/authRequest";
import { status } from "../../../utilities/enums/statusCode";
import { validateField } from "../../../utilities/helpers/validateField";


// @desc    Delete a user
// @route   DELETE /v1/api/users/:id
// @access  Private (Admin only)
export const deleteUserHandler = async (req:AuthRequest, res:Response): Promise<void> => {
  try {
    const userId = req.params.id;
    
    validateField(userId, "user ID", "string")

    // Authorization: Only admin can delete users
    if (req.user?.role !== "admin") {
      res.status(status.AccessDenied).json({ message: "Access denied" });
      return;
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      res.status(status.NotFound).json({ message: "User not found" });
      return;
    }

    // Remove the user
    const deleted = await user.deleteOne();
    if (!deleted) {
      res.status(status.Unauthorized).json({ message: "unable to delete user" });
      return;
    }

    // Send success response
    res.status(status.Success).json({ message: "User deleted successfully" });
    return;
  } catch (error: any) {
    // Internal server error response
    res.status(status.ServerError).json({
      message: "Internal server error",
      error: error.message,
    });
    return;
  }
};
