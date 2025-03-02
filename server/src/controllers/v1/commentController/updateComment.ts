// import PostComment from "../../../models/comment";
// import AuthRequest from "../../../types/authRequest";
// import { Response } from "express";
// import { IComment } from "../../../models/comment";

// // @desc    Approve or Reject a new comment
// // @route   POST /v1/api/comment
// // @access  Private (Only an admin, editor, or author and postContributor of the post --
// //should be able to update the status of a comment to "approved" or "rejected")
// export const updateCommentStatusHandler = async (req: AuthRequest, res: Response) => {
//   try {
//     const user = req.user;
//     const { commentId, status } = req.body;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }
//     // Check if the status is valid
//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status provided." });
//     }

//     // Fetch the comment by ID
//     const comment = await Comment.findById(commentId).populate({
//       path: "post",
//       populate: {
//         path: "author", // This ensures the post's author is also populated
//         select: "_id", // Only selecting the _id field of the post's author
//         path: "postContributor", // This ensures the post's postContributor is also populated
//         select: "_id",
//       },
//     });

//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found." });
//     }

//     // Authorization check: only admin, editor, author or postContributor can approve/reject
//     if (
//       user.role !== "admin" &&
//       user.role !== "editor" &&
//       comment.post.postContributor._id.toString() !== user._id.toString() &&
//       comment.post.author._id.toString() !== user._id.toString()
//     ) {
//       return res
//         .status(403)
//         .json({
//           message: "You are not authorized to update this comment status.",
//         });
//     }

//     // Update the comment status
//     comment.status = status;
//     await comment.save();

//     res.status(200).json({ message: `Comment ${status}`, comment });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating comment status", error });
//   }
// };
