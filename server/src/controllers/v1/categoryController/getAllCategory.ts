import Category from "../../../models/category";
import AuthRequest from "../../../types/authRequest";
import { status } from "../../../utilities/enums/statusCode";
import { Response } from "express";

// @desc    Get all categories
// @route   GET /v1/api/category
// @access  Public
export const getAllCategoriesHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const categories = await Category.find();
    if (!categories) {
      res
        .status(status.ServerError)
        .json({ message: "unable to get all categories" });
      return;
    } else if (categories.length === 0) {
      res.status(status.NoContent).json({ message: "no category exist yet" });
      return;
    }
    res.status(status.Success).json(categories);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
    return;
  }
};
