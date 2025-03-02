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
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = req.user;

    if (!user) {
      return res
        .status(status.Unauthorized)
        .json({ message: "User is not authenticated" });
    }

    validateRequiredField(id, "Tag ID", "string");

    validateRequiredField(name, "name", "string");

    // Authorization check: only admin, and editor can update a tag
    if (user.role !== "admin" && user.role !== "editor") {
      return res
        .status(status.AccessDenied)
        .json({ message: "You are not authorized to update a tag" });
    }

    const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedTag) {
      return res.status(status.NotFound).json({ message: "Tag not found" });
    }

    return res.status(status.Success).json(updatedTag);
  } catch (error: any) {
    return res
      .status(status.ServerError)
      .json({ message: "Error updating tag", error });
  }
};
