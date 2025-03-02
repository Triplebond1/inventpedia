import Tag from "../../../models/tag";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";
import { validateRequiredField } from "../../../utilities/helpers/validateField";

// @desc    Get a tag by id
// @route   GET /v1/api/tags/:id
// @access  Public
const getTagByIdHandler = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
          
        validateRequiredField(id, "Tag ID", "string")

        const tag = await Tag.findById(id);

        if (!tag) {
            return res.status(status.NotFound).json({ message: "Tag not found" });
        }

        return res.status(status.Success).json(tag);
    } catch (error) {
        return res.status(status.ServerError).json({ message: "Error fetching tag", error });
    }
};

export default getTagByIdHandler;