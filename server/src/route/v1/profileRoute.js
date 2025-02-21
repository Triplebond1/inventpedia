// import express from "express";
// const router = express.Router();
// import { validateToken } from "../../middlewares/v1/auth";
// import { authorize } from "../../middlewares/v1/authorize";
// import {
//   createProfileHandler,
//   getProfileHandler,
//   updateProfileHandler,
//   deleteProfileHandler,
// } from "../../controllers/v1/profileController";


// // @desc    Create a new profile
// // @route   POST /v1/api/profiles
// // @access  Private
// router.post(
//   "",
//   validateToken,
//   authorize("admin", "editor", "author", "contributor"),
//   createProfileHandler
// );

// // @desc    Get all profiles or a specific profile by ID
// // @route   GET /v1/api/profiles/:id?
// // @access  Public
// router.get("/:id?", getProfileHandler);

// // @desc    Update a profile
// // @route   PUT /v1/api/profiles/:id
// // @access  Private
// router.put("/:id", validateToken, updateProfileHandler);

// // @desc    Delete a profile
// // @route   DELETE /v1/api/profiles/:id
// // @access  Private
// router.delete("/:id", validateToken, deleteProfileHandler);

// module.exports = router;

// // @desc    Get all profiles or a specific profile by ID
// // @route   GET /v1/api/users/profiles/:id?
// // @access  Public
// router.get("/profiles/:id?", validateToken, getProfileHandler);
