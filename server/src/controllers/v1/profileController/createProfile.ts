import Profile from "../../../models/profile";
import { Response } from "express";
import AuthRequest from "../../../types/authRequest";
import { IProfile } from "../../../models/profile";
import { status } from "../../../utilities/enums/statusCode";
import { validateField } from "../../../utilities/helpers/validateField";

// @desc    Create a new profile
// @route   POST /v1/api/profiles
// @access  Private
export const createProfileHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      fullName,
      website,
      inventpediaPage,
      location,
      social = {
        twitter: undefined,
        facebook: undefined,
        linkedin: undefined,
        instagram: undefined,
      },
      bio,
    }: IProfile = req.body;
    const user = req.user;
    const userId = user?._id;

    if (!user) {
      res
        .status(status.Unauthorized)
        .json({ message: "User is not authenticated" });
      return;
    }

    validateField(fullName, "Full Name", "string");
    validateField(website, "Website", "string");
    validateField(inventpediaPage, "Inventpedia Page", "string");
    validateField(location, "Location", "string");
    validateField(bio, "Bio", "string");
    validateField(social.facebook, "social facebook", "string");
    validateField(social.twitter, "social twitter", "string");
    validateField(social.linkedin, "social linkedin", "string");
    validateField(social.instagram, "social instagram", "string");

    // Check if profile already exists for the user
    const existingProfile = await Profile.findOne({ userEmail: userId });
    if (existingProfile) {
      res
        .status(status.Unauthorized)
        .json({ message: "Profile already exists." });
      return;
    }

    if (user.role === "subscriber") {
      res
        .status(status.AccessDenied)
        .json({ message: "You are not authorized to create a profile." });
      return;
    }

    // Create a new profile
    const newProfile = new Profile({
      fullName: fullName || null,
      userName: userId, // Set userId reference for username
      userEmail: userId,
      userRole: userId,
      profilePicture: userId,
      website: website || null,
      inventpadiaPage: inventpediaPage || null,
      location: location || null,
      social: social || {},
      bio: bio || null,
    });

    await newProfile.save();

    res.status(status.Created).json({
      message: "Profile created successfully.",
      profile: newProfile.toJSON(),
    });
    return;
  } catch (error: any) {
    console.error("Error creating profile:", error);
    res
      .status(status.ServerError)
      .json({ message: "Error creating profile", error: error.message });
    return;
  }
};
