import Category from "../../../models/category";
import AuthRequest from "../../../types/authRequest";
import { status } from "../../../utilities/enums/statusCode";
import { Response } from "express";
import {
  validateField,
  validateRequiredField,
} from "../../../utilities/helpers/validateField";

// @desc    Create a new category
// @route   POST /v1/api/categories
// @access  Private (admin, editor)
export const createCategoryHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const user = req.user;

    if (!user) {
      res
        .status(status.Unauthorized)
        .json({ message: "User is not authenticated" });
      return;
    }
    // Authorization check: only admin, and editor can create a category
    if (user.role !== "admin" && user.role !== "editor") {
      res
        .status(status.AccessDenied)
        .json({ message: "You are not authorized to create a category" });
      return;
    }

    // Check if name is provided
    validateRequiredField(name, "Category Name", "string");
    validateField(description, "Category Description", "string");

    const categoryAlreadyExist = await Category.findOne({ name: name });

    if (categoryAlreadyExist) {
      res.status(status.BadRequest).json({ message: "category already exist" });
      return;
    }

    // Create a new category
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();

    res.status(status.Created).json({
      message: "Category created successfully",
      category: savedCategory,
    });
    return;
  } catch (error: any) {
    res
      .status(status.ServerError)
      .json({ message: "Error creating category", error });
    return;
  }
};
