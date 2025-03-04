import Tag from "../../../models/tag";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";
import { validateField } from "../../../utilities/helpers/validateField";

// @desc    Delete a tag
// @route   DELETE /v1/api/tag/:id
// @access  Private (Admin, editor)
export const deleteTagHandler = async (
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

    validateField(id, "Tag ID", "string");

    // Authorization check: only admin, and editor can update a tag
    if (user.role !== "admin" && user.role !== "editor") {
      res
        .status(status.AccessDenied)
        .json({ message: "You are not authorized to delete a tag" });
      return;
    }

    const deletedTag = await Tag.findByIdAndDelete(id);

    if (!deletedTag) {
      res.status(status.NotFound).json({ message: "Tag not found" });
      return;
    }

    res.status(status.Success).json({ message: "Tag deleted successfully" });
    return;
  } catch (error: any) {
    res
      .status(status.ServerError)
      .json({ message: "Error deleting tag", error });
    return;
  }
};
