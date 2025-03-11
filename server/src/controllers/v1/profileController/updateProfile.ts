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
): Promise<void> => {
  try {
    const { id } = req.params;
    let {
      fullName,
      profilePicture,
      website,
      inventpediaPage,
      location,
      social,
      bio,
    }: IProfile = req.body;

    const user = req.user;

    if (!user) {
      res
        .status(status.Unauthorized)
        .json({ message: "User is not authenticated" });
      return;
    }

    if (!id) {
      res.status(status.BadRequest).json({ message: "ID is required" });
      return;
    }

    validateField(fullName, "full name", "string");
    validateField(profilePicture, "Profile Picture", "string");
    validateField(website, "Website", "string");
    validateField(inventpediaPage, "Inventpedia Page", "string");
    validateField(location, "Location", "string");
    validateField(bio, "Bio", "string");

    const profile = await Profile.findById(id);
    if (!profile) {
      res.status(status.NotFound).json({ message: "Profile not found" });
      return;
    }

    // Authorization check (user should be authenticated and has their `id` in `req.user._id`)
    const isOwner =
      profile.userName.toString() === (user?._id as string).toString();
    const isAdmin = user.role === "admin";

    console.log({ isOwner, isAdmin });

    if (!isOwner && !isAdmin) {
      res.status(status.AccessDenied).json({
        message: "You are not authorized to update this profile.",
        role: user.role,
        name: user.username,
      });
      return;
    }

    // Update fields if provided
    profile.fullName = fullName || profile.fullName;
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

    res.status(status.Success).json({
      message: "Profile updated successfully",
      profile: profile.toJSON(),
    });
    return;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    res
      .status(status.ServerError)
      .json({ message: "Error updating profile", error });
    return;
  }
};
