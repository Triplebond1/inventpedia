import Category from "../../../models/category";
import AuthRequest from "../../../types/authRequest";
import { status } from "../../../utilities/enums/statusCode";
import { Response } from "express";
import {
  validateField,
  validateRequiredField,
} from "../../../utilities/helpers/validateField";

// @desc    Update an existing category
// @route   PUT /v1/api/category/:id
// @access  Private (Admin, and editor)
export const updateCategoryHandler = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(status.Unauthorized).json({ message: "User is not authenticated" });
    }

    validateRequiredField(id, "Category ID", "string")
    validateField(name, "Category name", "string");
    validateField(description, "Category description", "string");

    // Authorization check: only admin, and editor can create a tag

    const allowedRoles: string[] = ["admin", "editor"];

    if (!allowedRoles.includes(user.role)) {
      return res
        .status(status.Unauthorized)
        .json({ message: "You are not authorized to update a category" });
    }

    // Check if name is provided
    if (!name && !description) {
      return res
        .status(status.BadRequest)
        .json({ message: "Category name or description is required" });
    }

    // Update category
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(status.NotFound).json({ message: "Category not found" });
    }

    return res.status(status.Success).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error: any) {
    return res.status(status.ServerError).json({ message: "Error updating category", error });
  }
};
