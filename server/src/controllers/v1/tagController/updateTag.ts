import Tag from "../../../models/tag";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";
import { validateRequiredField } from "../../../utilities/helpers/validateField";

// // @desc    Update an existing tag
// // @route   PUT /v1/api/tag/:id
// // @access  Private (Admin, and editor)
export const updateTagHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = req.user;

    if (!user) {
      res
        .status(status.Unauthorized)
        .json({ message: "User is not authenticated" });
      return;
    }

    validateRequiredField(id, "Tag ID", "string");

    validateRequiredField(name, "name", "string");

    // Authorization check: only admin, and editor can update a tag
    if (user.role !== "admin" && user.role !== "editor") {
      res
        .status(status.AccessDenied)
        .json({ message: "You are not authorized to update a tag" });
      return;
    }

    const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedTag) {
      res.status(status.NotFound).json({ message: "Tag not found" });
      return;
    }

    res.status(status.Success).json(updatedTag);
    return;
  } catch (error: any) {
    res
      .status(status.ServerError)
      .json({ message: "Error updating tag", error });
    return;
  }
};
