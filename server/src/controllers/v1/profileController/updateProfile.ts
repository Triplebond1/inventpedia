import Profile, { IProfile } from "../../../models/profile";
import { Response } from "express";
import AuthRequest from "../../../types/authRequest";
import { status } from "../../../utilities/enums/statusCode";
import { validateField } from "../../../utilities/helpers/validateField";

// @desc    Update a profile
// @route   PUT /v1/api/profiles/:id
// @access  Private
export const updateProfileHandler = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    let {
      userName,
      userEmail,
      userRole,
      profilePicture,
      website,
      inventpediaPage,
      location,
      social,
      bio,
    }: IProfile = req.body;

    const user = req.user;

    if (!user) {
      return res
        .status(status.Unauthorized)
        .json({ message: "User is not authenticated" });
    }
    
    if (!id) {
      return res.status(status.BadRequest).json({message: "ID is required"})
    }

    validateField(userName, "User Name", "string");
    validateField(userEmail, "User Email", "string");
    validateField(userRole, "User Role", "string");
    validateField(profilePicture, "Profile Picture", "string");
    validateField(website, "Website", "string");
    validateField(inventpediaPage, "Inventpedia Page", "string");
    validateField(location, "Location", "string");
    validateField(bio, "Bio", "string");

    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(status.NotFound).json({ message: "Profile not found" });
    }

    // Authorization check (user should be authenticated and has their `id` in `req.user._id`)
    if (
      profile.userName.toString() !== (user?._id as string).toString() ||
      user.role !== "admin"
    ) {
      return res
        .status(status.AccessDenied)
        .json({ message: "You are not authorized to update this profile." });
    }

    // Update fields if provided
    profile.userName = userName || profile.userName;
    profile.userEmail = userEmail || profile.userEmail;
    profile.userRole = userRole || profile.userRole;
    profile.profilePicture = profilePicture || profile.profilePicture;
    profile.website = website || profile.website;
    profile.inventpediaPage = inventpediaPage || profile.inventpediaPage;
    profile.location = location || profile.location;
    profile.social = {
      twitter: social?.twitter ? social.twitter : profile.social?.twitter,
      facebook: social?.facebook ? social.facebook : profile.social?.facebook,
      linkedin: social?.linkedin ? social.linkedin : profile.social?.linkedin,
      instagram: social?.instagram
        ? social.instagram
        : profile.social?.instagram,
    };

    profile.bio = bio || profile.bio;

    await profile.save();

    return res.status(status.Success).json({
      message: "Profile updated successfully",
      profile: profile.toJSON(),
    });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return res
      .status(status.ServerError)
      .json({ message: "Error updating profile", error });
  }
};
