import express from "express";
const router = express.Router();
import validateToken from "../../middlewares/v1/auth";
import { authorize } from "../../middlewares/v1/authorize";
import { createTagHandler } from "../../controllers/v1/tagController/createTag";
import { getAllTagsHandler } from "../../controllers/v1/tagController/getAllTag";
import getTagByIdHandler from "../../controllers/v1/tagController/getTag";
import { updateTagHandler } from "../../controllers/v1/tagController/updateTag";
import { deleteTagHandler } from "../../controllers/v1/tagController/deleteTag";

// @desc    Create a new Tag
// @route   POST /v1/api/tag
// @access  Private (admin, editor)
router.post("/", validateToken, authorize("admin", "editor"), createTagHandler);

// @desc    Get a tag by id
// @route   GET /v1/api/tags/:id
// @access  Public
router.get("/", getAllTagsHandler);

// @desc    Get all tags
// @route   GET /v1/api/tag
// @access  Public
router.get("/:id", getTagByIdHandler);

// @desc    Update an existing tag
// @route   PUT /v1/api/tag/:id
// @access  Private (Admin, and editor)
router.put(
  "/:id",
  validateToken,
  authorize("admin", "editor"),
  updateTagHandler
);

// @desc    Delete a tag
// @route   DELETE /v1/api/tag/:id
// @access  Private (Admin, editor)
router.delete(
  "/:id",
  validateToken,
  authorize("admin", "editor"),
  deleteTagHandler
);

module.exports = router;
