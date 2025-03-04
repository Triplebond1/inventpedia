import { Response } from "express";
import AuthRequest from "../../../types/authRequest";
import User from "../../../models/user";
import { status } from "../../../utilities/enums/statusCode";

// @desc    Get all users
// @route   GET /v1/api/users
// @access  Private (Admin only)
export const getAllUsersHandler = async (req:AuthRequest, res:Response) : Promise<void> => {
  try {
    // Only admin can access
    if ( req.user?.role !== "admin") {
      res.status(status.AccessDenied).json({ message: "Access denied" });
      return;
        
    }

    // Find all users and exclude their passwords
    const users = await User.find().select("-password");

    res.status(status.Success).json(users);
    return;
     
  } catch (error) {
    res.status(status.ServerError).json({ message: "Internal server error", error });
    return;
      
  }
};