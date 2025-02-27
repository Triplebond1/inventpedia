import Post from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";

const resStatus = status;

// @desc    change the status of post to publish, archived or draft
// @route   Put /v1/api/post/status
// @access  Private (Only admin, and editor should be able to update the status of a post)
export const updatePostStatusHandler = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    let { postId, status } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(resStatus.Unauthorized).json({ message: "User is not authenticated" });
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
      return res.status(resStatus.BadRequest).json({ message: "Invalid status provided." });
    }

    // Fetch the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(resStatus.NotFound).json({ message: "post not found." });
    }

    // Authorization check: only admin, editor and author can update post status
    const allowedRoles = ["admin", "editor"];
    if (
      !allowedRoles.includes(user.role) ||
      post.author.toString() !== (user?._id as string).toString()
    ) {
      return res
        .status(resStatus.AccessDenied)
        .json({ message: "You do not have permission to update post status" });
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

    return res.status(resStatus.Accepted).json({ message: `post ${status}`, post });
  } catch (error: any) {
    return res
      .status(resStatus.ServerError)
      .json({ message: "Error updating post status", error });
  }
};
