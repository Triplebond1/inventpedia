import Profile from "../../../models/profile";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";


// @desc    Delete a profile
// @route   DELETE /v1/api/profiles/:id
// @access  Private (admin, and profile owner)
export const deleteProfileHandler = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(status.Unauthorized).json({ message: "User is not authenticated" });
    }

    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(status.NotFound).json({ message: "Profile not found" });
    }

    // Authorization check (user should be authenticated and has their `id` in `req.user._id`)
    if (
      profile.userName.toString() !== (user._id as string).toString() ||
      user.role !== "admin"
    ) {
      return res
        .status(status.Unauthorized)
        .json({ message: "You are not authorized to delete this profile." });
    }

    await profile.deleteOne();
    return res.status(status.Success).json({ message: "Profile deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting profile:", error);
    return res.status(status.serverError).json({ message: "Error deleting profile", error });
  }
};