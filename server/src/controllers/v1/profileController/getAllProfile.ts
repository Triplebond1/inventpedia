import Profile from "../../../models/profile";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";

// @desc    Get all profiles or a specific profile by ID
// @route   GET /v1/api/profiles/:id?
// @access  Public
export const getAllProfileHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;

    const allowedRoles: string[] = ["admin", "moderator"];

    if (!user?.role || !allowedRoles.includes(user.role)) {
      res.status(status.AccessDenied).json({ message: "Access denied" });
      return;
    }

    const profile = await Profile.find()
      .populate("userName", "username")
      .populate("userEmail", "email")
      .populate("userRole", "role");

    res.status(status.Success).json({ profile });
    return;
  } catch (error: any) {
    console.error("Error fetching profiles:", error);
    res
      .status(status.ServerError)
      .json({ message: "Error fetching profiles", error });
    return;
  }
};
