// import Profile from "../../models/profile";

// // @desc    Create a new profile
// // @route   POST /v1/api/profiles
// // @access  Private
// const createProfileHandler = async (req, res) => {
//   try {
//     const { website, inventnexusPage, location, social, bio } = req.body;
//     const user = req.user;
//     const userId = user._id;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }
//     // Check if profile already exists for the user
//     const existingProfile = await Profile.findOne({ userEmail: userId });
//     if (existingProfile) {
//       return res.status(400).json({ message: "Profile already exists." });
//     }

//     if (user.role === "subscriber") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to create a profile." });
//     }

//     // Create a new profile
//     const newProfile = new Profile({
//       userName: userId, // Set userId reference for username
//       userEmail: userId,
//       userRole: userId,
//       profilePicture: userId,
//       website: website || "",
//       inventnexusPage: inventnexusPage || "",
//       location: location || "",
//       social: social || {},
//       bio: bio || "",
//     });

//     await newProfile.save();

//     res.status(201).json({
//       message: "Profile created successfully.",
//       profile: newProfile.toJSON(),
//     });
//   } catch (error) {
//     console.error("Error creating profile:", error);
//     res
//       .status(500)
//       .json({ message: "Error creating profile", error: error.message });
//   }
// };

// // @desc    Get all profiles or a specific profile by ID
// // @route   GET /v1/api/profiles/:id?
// // @access  Public
// const getProfileHandler = async (req, res) => {
//   try {
//     const { id } = req.params;

//     let profile;
//     if (id) {
//       profile = await Profile.findById(id)
//         .populate("userName", "username")
//         .populate("userEmail", "email")
//         .populate("userRole", "role")
//         .populate("profilePicture", "profilePicture");

//       if (!profile) {
//         return res.status(404).json({ message: "Profile not found" });
//       }
//     } else {
//       profile = await Profile.find()
//         .populate("userName", "username")
//         .populate("userEmail", "email")
//         .populate("userRole", "role")
//         .populate("profilePicture", "profilePicture");
//     }

//     res.status(200).json({ profile });
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//     res.status(500).json({ message: "Error fetching profiles", error });
//   }
// };

// // @desc    Update a profile
// // @route   PUT /v1/api/profiles/:id
// // @access  Private
// const updateProfileHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let {
//       userName,
//       userEmail,
//       userRole,
//       profilePicture,
//       website,
//       inventnexusPage,
//       location,
//       social,
//       bio,
//     } = req.body;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     const profile = await Profile.findById(id);
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     // Authorization check (Assuming user is authenticated and has their `id` in `req.user._id`)
//     if (
//       profile.userName.toString() !== user._id.toString() ||
//       user.role !== "admin"
//     ) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update this profile." });
//     }

//     // Update fields if provided
//     profile.userName = userName || profile.userName;
//     profile.userEmail = userEmail || profile.userEmail;
//     profile.userRole = userRole || profile.userRole;
//     profile.profilePicture = profilePicture || profile.profilePicture;
//     profile.website = website || profile.website;
//     profile.inventnexusPage = inventnexusPage || profile.inventnexusPage;
//     profile.location = location || profile.location;
//     profile.social = social || profile.social;
//     profile.bio = bio || profile.bio;

//     await profile.save();

//     res.status(200).json({
//       message: "Profile updated successfully",
//       profile: profile.toJSON(),
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Error updating profile", error });
//   }
// };

// // @desc    Delete a profile
// // @route   DELETE /v1/api/profiles/:id
// // @access  Private (admin, and profile owner)
// const deleteProfileHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     const profile = await Profile.findById(id);
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     console.log(profile);
//     // Authorization check (Assuming user is authenticated and has their `id` in `req.user._id`)
//     if (
//       profile.userName.toString() !== user._id.toString() ||
//       user.role !== "admin"
//     ) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to delete this profile." });
//     }

//     await profile.deleteOne();
//     res.status(200).json({ message: "Profile deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting profile:", error);
//     res.status(500).json({ message: "Error deleting profile", error });
//   }
// };

// module.exports = {
//   createProfileHandler,
//   getProfileHandler,
//   updateProfileHandler,
//   deleteProfileHandler,
// };
