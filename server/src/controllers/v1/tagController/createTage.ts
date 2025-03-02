import Tag from "../../../models/tag";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";
import { validateRequiredField } from "../../../utilities/helpers/validateField";

// @desc    Create a new Tag
// @route   POST /v1/api/tag
// @access  Private (admin, editor)
export const createTagHandler = async (req:AuthRequest, res: Response):Promise<Response> => {
  try {
    const { name } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(status.Unauthorized).json({ message: "User is not authenticated" });
    }

    validateRequiredField(name, "name", "string")

    // Authorization check: only admin, and editor can create a tag
    if (user.role !== "admin" && user.role !== "editor") {
      return res
        .status(403)
        .json({ message: "You are not authorized to create a tag" });
    }
    // Create new tag
    const newTag = new Tag({ name });
    const savedTag = await newTag.save();

    return res.status(201).json(savedTag);
  } catch (error: any) {
    return res.status(500).json({ message: "Error creating tag", error });
  }
};