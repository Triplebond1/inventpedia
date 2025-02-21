// import express from "express";
// const router = express.Router();
// import { validateToken } from "../../middlewares/v1/auth";
// import { authorize } from "../../middlewares/v1/authorize";
// import {
//   createCommentHandler,
//   updateCommentStatusHandler,
//   getCommentByIdHandler,
//   getCommentsByPostHandler,
//   getAllCommentsHandler,
//   updateCommentHandler,
//   deleteCommentHandler,
// } from "../../controllers/v1/commentController";


// // @desc    Create a new comments
// // @route   POST /v1/api/comments
// // @access  Private (authenticated users)
// router.post("", validateToken, createCommentHandler);

// // @desc    Get all comment for a specific post
// // @route   GET /v1/api/comments
// // @access  Public
// router.get("/post/:postId", getCommentsByPostHandler);

// // @desc    Get All Comments (Filter by status)
// // @route   GET /v1/api/comments
// // @access  Public
// router.get("", getAllCommentsHandler);

// // @desc    Get a comment by id
// // @route   GET /v1/api/comments/:id
// // @access  Public
// router.get("/:id", getCommentByIdHandler);

// // @desc    Approve or Reject a Comment a new comment
// // @route   Put /v1/api/comments/status
// // @access  Private (Only an admin, editor, or author should be able to update the status of a comment to "approved" or "rejected")
// router.put(
//   "/status",
//   validateToken,
//   authorize("admin", "editor", "author"),
//   updateCommentStatusHandler
// );

// // @desc    Update an existing comment
// // @route   PUT /v1/api/comments/:id
// // @access  Private (Authenticated user)
// router.put("/:id", validateToken, updateCommentHandler);

// // @desc    Delete a comment
// // @route   DELETE /v1/api/comments/:id
// // @access  Private (Admin, editor)
// router.delete(
//   "/:id",
//   validateToken,
//   authorize("admin", "editor", "subscriber"),
//   deleteCommentHandler
// );

// module.exports = router;
