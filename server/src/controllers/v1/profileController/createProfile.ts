import Profile from "../../../models/profile";
import { IProfile } from "../../../models/profile";
import { IUser } from "../../../models/user";
import { error } from "console";

// @desc    Create a new profile
// @route   POST /v1/api/profiles
// @access  Private
export const createProfileHandler = async (
 user: IUser
): Promise<IProfile> => {
  try {

    const userId = user?._id;

    if (!user) {
      throw error ("A User is required to create profile");
    }


    // Check if profile already exists for the user
    const existingProfile = await Profile.findOne({ userEmail: userId });
    if (existingProfile) {
      throw error ("Profile already exists.",);
    }

    if (user.role === "guest") {
      throw error ("You are not authorized to create a profile.");
    }

    // Create a new profile
    const newProfile = new Profile({
      fullName: null,
      userName: userId, // Set userId reference for username
      userEmail: userId,
      userRole: userId,
      profilePicture: null,
      website: null,
      inventpadiaPage: null,
      location: null,
      social:  {},
      bio: null,
    });

    const profile = await newProfile.save();
    return profile;
  } catch (error: any) {
    console.error("Error creating profile:", error);
    throw new Error (error.message);
  }
};
