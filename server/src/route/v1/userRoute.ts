import express from "express";
const router = express.Router();
import  validateToken  from "../../middlewares/v1/auth";
import { authorize } from "../../middlewares/v1/authorize";

import { createUserHandler } from "../../auth/signUp";
import { logInUserHandler } from "../../auth/signIn";
import { logOutUserHandler } from "../../auth/signOut";
import { getUserHandler } from "../../controllers/v1/userController/getUser";
import { getAllUsersHandler } from "../../controllers/v1/userController/getAllUser";
import { updateUserHandler } from "../../controllers/v1/userController/updateUser";

// @desc    Create a new user
// @route   POST /v1/api/users
// @access  Public (Registration) or Private (Admin creating users)
router.post("", createUserHandler);

// @desc LOGGIN user
// @route POST /v1/api/users/login
// @access public
router.post("/login", logInUserHandler);

// @desc LOGGIN user
// @route POST /v1/api/users/login
// @access public
router.post("/logout", logOutUserHandler);

// @desc    Get a single user by ID
// @route   GET /v1/api/users/:id
// @access  Public
router.get("/:id", validateToken, getUserHandler);

// @desc    Get all users
// @route   GET /v1/api/users
// @access  Private (Admin only)
router.get("/", validateToken, authorize('admin'), getAllUsersHandler);

// @desc    Update an existing user
// @route   PUT /v1/api/users/:id
// @access  Private (Admin and the user themselves)
router.put("/:id", validateToken, updateUserHandler);

// // @desc    Delete a user
// // @route   DELETE /v1/api/users/:id
// // @access  Private (Admin only)
// router.delete("/:id", validateToken, authorize('admin'), deleteUserHandler);

export default router;
