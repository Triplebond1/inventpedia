import Category from "../../../models/category";
import AuthRequest from "../../../types/authRequest";
import { status } from "../../../utilities/enums/statusCode";
import { Response } from "express";
import { validateRequiredField } from "../../../utilities/helpers/validateField";

// @desc    Get a category by id
// @route   GET /v1/api/category/:id
// @access  Public
export const getCategoryByIdHandler = async (req:AuthRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    validateRequiredField(id, "Category ID", "string")
    
    // Find category by ID
    const category = await Category.findById(id);
    if (!category) {
      return res.status(status.NotFound).json({ message: "Category not found" });
    }

    return res.status(status.Success).json(category);
  } catch (error) {
    return res.status(status.ServerError).json({ message: "Error fetching category", error });
  }
};