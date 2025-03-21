import Post from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";
import { validateRequiredField } from "../../../utilities/helpers/validateField";

// @desc    Delete a post
// @route   DELETE /v1/api/post/:id
// @access  Private (Admin, editor and author)
export const deletePostHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      res.status(status.Unauthorized).json({ message: "User is not authenticated" });
      return;
    }

    validateRequiredField(id, "Post ID", "string");

    // Find the post to delete
    const post = await Post.findById(id);

    if (!post) {
      res.status(status.NotFound).json({ message: "Post not found" });
      return;
    }

      // Check if the user is an admin, editor, or the author of the post
      const allowedRoles = ["admin", "editor"];
    if ( !allowedRoles.includes(user.role) ||
      post.author.toString() !== (user?._id as string).toString()
    ) {
       res
        .status(status.AccessDenied)
        .json({ message: "You do not have permission to delete this post" });
        return;
    }

    // Delete the post
    await post.deleteOne();

    res.status(status.Success).json({ message: "Post deleted successfully" });
    return;
  } catch (error: any) {
    console.error("Error deleting post:", error);
    res.status(status.ServerError).json({ message: "Error deleting post", error });
    return;
  }
};