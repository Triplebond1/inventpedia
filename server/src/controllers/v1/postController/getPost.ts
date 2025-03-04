import Post from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";

// @desc    Get a post by id
// @route   GET /v1/api/post /:id
// @access  Public
export const getAPostHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate and set 'id' in the query if provided
    if (id) {
      if (typeof id !== "string") {
        res.status(status.BadRequest).json({
          message: "'id' must be a string",
        });
        return;
      }
    }

    // Find post based on the constructed query
    const post = await Post.findById(id)
      .populate("author", "username") // Populate author field
      .populate("categories", "name") // Populate categories
      .populate("tags", "name") //populate tags
      .populate("parentPost", "title") // Populate parentPost
      .populate("relatedPosts", "postLink")
      .populate("nextPost", "postLink")
      .populate("previousPost", "postLink");

    // Handle no post found
    if (!post) {
      res.status(status.NotFound).json({ message: "Post not found" });
      return;
    }

    // Return the found post
    res.status(status.Success).json(post);
    return;
  } catch (error: any) {
    console.error("Error fetching post:", error);
    res
      .status(status.ServerError)
      .json({ message: "Error fetching post", error });
    return;
  }
};
