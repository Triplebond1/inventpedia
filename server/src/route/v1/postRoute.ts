import express from "express";
const router = express.Router();
import validateToken from "../../middlewares/v1/auth";
import { authorize } from "../../middlewares/v1/authorize";
import { createPostHandler } from "../../controllers/v1/postController/createPost";
import { getAPostHandler } from "../../controllers/v1/postController/getPost";
import { getAllPostsHandler } from "../../controllers/v1/postController/getAllPost";
import { updatePostStatusHandler } from "../../controllers/v1/postController/updatePostStatus";
import { updatePostHandler } from "../../controllers/v1/postController/updatePost";
import { deletePostHandler } from "../../controllers/v1/postController/deletePost";
import { updateStagedHandler } from "../../versionControl/stagedPost/updateStage";
import { getStageHandler } from "../../versionControl/stagedPost/getStage";

// @desc    Create a new post
// @route   POST /v1/api/post
// @access  Private (admin, editor, author, contributor)
router.post(
  "",
  validateToken,
  authorize("admin", "editor", "author", "contributor"),
  createPostHandler
);

// @desc    Get a post with id
// @route   GET /v1/api/post /:id
// @access  Public
router.get("/:id", getAPostHandler);

// @desc    Get a post with id
// @route   GET /v1/api/post /:id
// @access  Public
router.get("/staged/:id", getStageHandler);

// @desc    Get a post with permalink
// @route   GET /v1/api/post/:permalink
// @access  Public
router.get("/:permalink", getAPostHandler);

// @desc    Get all posts (with optional filtering by  author, category, status, tag, and date range)
// @route   GET /v1/api/post
// @access  Public
router.get("/", getAllPostsHandler);

// @desc    change the status of post to publish, archived or draft
// @route   Put /v1/api/post/status
// @access  Private (Only admin, and editor should be able to update the status of a post)
router.put(
  "/status",
  validateToken,
  authorize("admin", "editor"),
  updatePostStatusHandler
);
// @desc    Update an existing post
// @route   PUT /v1/api/post/:id
// @access  Private (all except guest)
router.put(
  "/:id",
  validateToken,
  authorize(
    "admin",
    "author",
    "contributor",
    "editor",
    "moderator",
    "reviewer",
    "subscriber"
  ),
  updatePostHandler
);

// @desc    Update an existing post
// @route   PUT /v1/api/post/staged/:id
// @access  Private (everybody except guest)
router.put(
  "/staged/:id",
  validateToken,
  authorize(
    "admin",
    "author",
    "contributor",
    "editor",
    "moderator",
    "reviewer",
    "subscriber"
  ),
  updateStagedHandler
);

// @desc    Delete a post
// @route   DELETE /v1/api/post/:id
// @access  Private (Admin, editor and author)
router.delete(
  "/:id",
  validateToken,
  authorize("admin", "editor", "author"),
  deletePostHandler
);
export default router;
