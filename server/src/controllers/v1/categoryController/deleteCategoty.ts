import Category from "../../../models/category";
import AuthRequest from "../../../types/authRequest";
import { status } from "../../../utilities/enums/statusCode";
import { Response } from "express";
import { validateRequiredField } from "../../../utilities/helpers/validateField";

// @desc    Delete a category
// @route   DELETE /v1/api/category/:id
// @access  Private (Admin, editor)
export const deleteCategoryHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
       res
        .status(status.Unauthorized)
        .json({ message: "User is not authenticated" });
        return;
    }

    validateRequiredField(id, "Category ID", "string")
    // Authorization check: only admin, and editor can create a tag
    if (user.role !== "admin" && user.role !== "editor") {
      res
        .status(status.AccessDenied)
        .json({ message: "You are not authorized to delete a category" });
        return;
    }

    // Delete the category
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      res
        .status(status.NotFound)
        .json({ message: "Category not found" });
        return;
    }

     res
      .status(status.Success)
      .json({ message: "Category deleted successfully" });
      return;
  } catch (error) {
    console.log(error);
    res
      .status(status.ServerError)
      .json({ message: "Error deleting category", error });
      return;
  }
};
