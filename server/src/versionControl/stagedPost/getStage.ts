import { StagedPost } from "../../models/stagedPost";
import AuthRequest from "../../types/authRequest";
import { status } from "../../utilities/enums/statusCode";
import { validateRequiredField } from "../../utilities/helpers/validateField";
import { Response } from "express";

export const getStageHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    validateRequiredField(id, "staged post ID", "string");

    const staged = await StagedPost.findById(id).populate([
      { path: "stagedPostAuthor", select: "username" }, // Populate author field
      { path: "categories", select: "name" }, // Populate categories
      { path: "tags", select: "name" }, // Populate tags
      { path: "relatedPosts", select: "slug" }, // Populate related posts
      { path: "nextPost", select: "slug" }, // Populate next post
      { path: "previousPost", select: "slug" }, // Populate previous post
    ]);

    if (!staged) {
      res
        .status(status.NotFound)
        .json({ message: "staged post not found, check id" });
      return;
    }

    res.status(status.Success).json({
      message: "success fetching staged post",
      stagedPost: staged,
    });
    return;
  } catch (error: any) {
    console.log("error fetching staged post");
    res.status(status.ServerError).json({ message: "internal server error" });
    return;
  }
};
