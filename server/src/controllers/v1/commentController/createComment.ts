import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import Comment, { IComment, IPostComment } from "../../../models/comment";
import { status } from "../../../utilities/enums/statusCode";
import PostComment from "../../../models/comment";

const resStatus = status;
// @desc    Create a new comment
// @route   POST /v1/api/comment
// @access  Private (authenticated users)
export const createCommentHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user; // Get user making the comment
    const { postId, parentCommentId, content, status } = req.body;

    if (!user) {
      res.status(401).json({ message: "User is not authenticated" });
      return;
    }

    // Validate necessary fields
    if (!postId || !content) {
      res.status(400).json({ message: "Post and content are required." });
      return;
    }

    // Determine the comment status based on the user's role
    //   let status = "pending"; // Default to "pending"
    //   const isStatusAllowed = ["admin", "editor","author", "moderator", "reviewer"]
    // if (
    //     isStatusAllowed.includes(user.role)
    // ) {
    //   status = "approved"; // Auto approve for admin, editor, or author
    // }

    const postComment = await PostComment.findOne({ postId: postId });
    if (!postComment) {
      const newComment = new PostComment({
        postId: postId,
        commentList: {
          author: user._id,
          parentCommentId: parentCommentId || null,
          content: content,
          status: status,
        },
      });

      await newComment.save();

      res
        .status(resStatus.Created)
        .json({ message: "Comment created", comment: newComment });
      return;
    }

    const lastComment =
      postComment.commentList[postComment.commentList.length - 1];
    const addComment: IComment = {
      author: user._id as any,
      parentCommentId: parentCommentId || null,
      content: content,
      status: status,
    };

    const addCommentToPost = postComment.commentList.push(
      addComment as typeof lastComment
    ) as unknown as IPostComment;

    const commentAdded = await addCommentToPost.save();
    if (!commentAdded) {
      res.status(resStatus.BadRequest);
      return;
    }

    res
      .status(resStatus.Created)
      .json({ message: "comment created succefully", comment: addComment });
    return;
  } catch (error: any) {
    res
      .status(status.ServerError)
      .json({ message: "Error creating comment", error });
    return;
  }
};
