import Tag from "../../../models/tag";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";

// @desc    Get all tags
// @route   GET /v1/api/tag
// @access  Public
export const getAllTagsHandler = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const tags = await Tag.find();
        res.status(status.Success).json(tags);
        return;
    } catch (error) {
        res.status(status.ServerError).json({ message: "Error fetching tags", error });
        return;
    }
};