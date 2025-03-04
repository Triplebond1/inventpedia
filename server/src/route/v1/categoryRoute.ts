import express from "express";
const router = express.Router();
import  validateToken  from "../../middlewares/v1/auth";
import { authorize } from "../../middlewares/v1/authorize";
import { createCategoryHandler } from "../../controllers/v1/categoryController/createCategory";
import { getAllCategoriesHandler } from "../../controllers/v1/categoryController/getAllCategory";
import { getCategoryByIdHandler } from "../../controllers/v1/categoryController/getCategory";
import { updateCategoryHandler } from "../../controllers/v1/categoryController/updateCategory";
import { deleteCategoryHandler } from "../../controllers/v1/categoryController/deleteCategoty";


// @desc    Create a new category
// @route   POST /v1/api/category
// @access  Private (admin, editor)
router.post(
  "",
  validateToken,
  authorize("admin", "editor"),
  createCategoryHandler
);

// @desc    Get a category by id
// @route   GET /v1/api/category/:id
// @access  Public
router.get("", getAllCategoriesHandler);

// @desc    Get all categories
// @route   GET /v1/api/category
// @access  Public
router.get("/:id", getCategoryByIdHandler);

// @desc    Update an existing category
// @route   PUT /v1/api/category/:id
// @access  Private (Admin, and editor)
router.put(
  "/:id",
  validateToken,
  authorize("admin", "editor"),
  updateCategoryHandler
);

// @desc    Delete a category
// @route   DELETE /v1/api/category/:id
// @access  Private (Admin, editor)
router.delete(
  "/:id",
  validateToken,
  authorize("admin", "editor"),
  deleteCategoryHandler
);

module.exports = router;
