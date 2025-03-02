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
): Promise<Response> => {
  try {
    const { name, description } = req.body;
    const user = req.user;

    if (!user) {
      return res
        .status(status.Unauthorized)
        .json({ message: "User is not authenticated" });
    }
    // Authorization check: only admin, and editor can create a category
    if (user.role !== "admin" && user.role !== "editor") {
      return res
        .status(status.AccessDenied)
        .json({ message: "You are not authorized to create a category" });
    }

    // Check if name is provided
    validateRequiredField(name, "Category Name", "string");
    validateField(description, "Category Description", "string");

    const categoryAlreadyExist = await Category.findOne({ name: name });

    if (categoryAlreadyExist) {
      return res
        .status(status.BadRequest)
        .json({ message: "category already exist" });
    }

    // Create a new category
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();

    return res.status(status.Created).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error: any) {
    return res
      .status(status.ServerError)
      .json({ message: "Error creating category", error });
  }
};
