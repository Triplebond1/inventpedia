import Profile from "../../../models/profile";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";

// @desc    Get all profiles or a specific profile by ID
// @route   GET /v1/api/profiles/:id?
// @access  Public
export const getProfileHandler = async (req: AuthRequest, res:Response): Promise<Response> => {
  try {
    const { id } = req.params;

    let profile;
    if (id) {
      profile = await Profile.findById(id)
        .populate("userName", "username")
        .populate("userEmail", "email")
        .populate("userRole", "role")

      if (!profile) {
        return res.status(status.NotFound).json({ message: "Profile not found" });
      }
    } else {
        return res.status(status.BadRequest).json({ message: "Invalid profile ID" });
    }

    return res.status(status.Success).json({ profile });
  } catch (error:any) {
    console.error("Error fetching profiles:", error);
    return res.status(status.ServerError).json({ message: "Error fetching profiles", error });
  }
};
