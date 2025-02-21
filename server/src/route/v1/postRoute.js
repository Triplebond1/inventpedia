// import express from "express";
// const router = express.Router();
// import { validateToken } from "../../middlewares/v1/auth";
// import { authorize } from "../../middlewares/v1/authorize";
// import {
//   createPostHandler,
//   getAllPostsHandler,
//   getAPostHandler,
//   updatePostStatusHandler,
//   updatePostHandler,
//   deletePostHandler,
// } from "../../controllers/v1/postController";


// // @desc    Create a new post
// // @route   POST /v1/api/post
// // @access  Private (admin, editor, author, contributor)
// router.post(
//   "",
//   validateToken,
//   authorize("admin", "editor", "author", "contributor"),
//   createPostHandler
// );

// // @desc    Get a post with id
// // @route   GET /v1/api/post /:id
// // @access  Public
// router.get("/:id", getAPostHandler);

// // @desc    Get a post with permalink
// // @route   GET /v1/api/post/:permalink
// // @access  Public
// router.get("/:permalink", getAPostHandler);

// // @desc    Get all posts (with optional filtering by  author, category, status, tag, and date range)
// // @route   GET /v1/api/post
// // @access  Public
// router.get("/", getAllPostsHandler);

// // @desc    change the status of post to publish, archived or draft
// // @route   Put /v1/api/post/status
// // @access  Private (Only admin, and editor should be able to update the status of a post)
// router.put(
//   "/status",
//   validateToken,
//   authorize("admin", "editor"),
//   updatePostStatusHandler
// );
// // @desc    Update an existing post
// // @route   PUT /v1/api/post/:id
// // @access  Private (Admin, editor and author)
// router.put(
//   "/:id",
//   validateToken,
//   authorize("admin", "editor", "author", "contributor"),
//   updatePostHandler
// );

// // @desc    Delete a post
// // @route   DELETE /v1/api/post/:id
// // @access  Private (Admin, editor and author)
// router.delete(
//   "/:id",
//   validateToken,
//   authorize("admin", "editor", "author"),
//   deletePostHandler
// );

// module.exports = router;
