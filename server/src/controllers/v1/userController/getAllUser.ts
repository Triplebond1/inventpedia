import { Response } from "express";
import AuthRequest from "../../../types/authRequest";
import User from "../../../models/user";
import { status } from "../../../utilities/enums/statusCode";

// @desc    Get all users
// @route   GET /v1/api/users
// @access  Private (Admin only)
export const getAllUsersHandler = async (req:AuthRequest, res:Response) : Promise<Response> => {
  try {
    // Only admin can access
    if ( req.user?.role !== "admin") {
        return res.status(status.accessDenied).json({ message: "Access denied" });
        
    }

    // Find all users and exclude their passwords
    const users = await User.find().select("-password");

    return res.status(status.Success).json(users);
     
  } catch (error) {
    return res.status(status.serverError).json({ message: "Internal server error", error });
      
  }
};