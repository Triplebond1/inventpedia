import Post from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";



// @desc    change the status of post to publish, archived or draft
// @route   Put /v1/api/post/status
// @access  Private (Only admin, and editor should be able to update the status of a post)
export const updatePostStatusHandler = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    let { postId, status } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User is not authenticated" });
    }
    // Check if the status is valid
    if (
      ![
        "published",
        "archived",
        "draft",
        "review",
        "reviewed",
        "rejected",
      ].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status provided." });
    }

    // Fetch the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "post not found." });
    }

    // Authorization check: only admin, editor and author can update post status
    if (
      user.role !== "admin" &&
      user.role !== "editor" &&
      user.role !== "author"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update post status." });
    }

    // Check if user has permission to change the post status from current status
    if (
      ["admin", "editor"].includes(user.role) ||
      (user.role === "author" &&
        ((post.status === "reviewed" && status === "published") ||
          (["archived", "draft", "rejected"].includes(post.status) &&
            status === "review") ||
          (["draft", "rejected"].includes(post.status) &&
            status === "archived")))
    ) {
      // Allow status change
      status = status;
    } else {
      // Revert to original status if conditions are not met
      status = post.status;
    }

    // Update the post status
    post.status = status;
    await post.save();

    return res.status(200).json({ message: `post ${status}`, post });
  } catch (error) {
    return res.status(500).json({ message: "Error updating post status", error });
  }
};
