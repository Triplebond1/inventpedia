// import Comment from "../../models/comment";

// // @desc    Create a new comment
// // @route   POST /v1/api/comment
// // @access  Private (authenticated users)
// const createCommentHandler = async (req, res) => {
//   try {
//     const user = req.user; // Get user making the comment
//     const { post, parentComment, content } = req.body;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }
//     // Validate necessary fields
//     if (!post || !content) {
//       return res
//         .status(400)
//         .json({ message: "Post and content are required." });
//     }

//     // Determine the comment status based on the user's role
//     let status = "pending"; // Default to "pending"
//     if (
//       user.role === "admin" ||
//       user.role === "editor" ||
//       user.role === "author"
//     ) {
//       status = "approved"; // Auto approve for admin, editor, or author
//     }

//     const newComment = new Comment({
//       post,
//       author: user._id,
//       parentComment: parentComment || null,
//       content,
//       status,
//     });

//     await newComment.save();

//     res.status(201).json({ message: "Comment created", comment: newComment });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating comment", error });
//   }
// };

// // @desc    Approve or Reject a new comment
// // @route   POST /v1/api/comment
// // @access  Private (Only an admin, editor, or author and postContributor of the post --
// //should be able to update the status of a comment to "approved" or "rejected")
// const updateCommentStatusHandler = async (req, res) => {
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
//         .json({ message: "You are not authorized to update this comment status." });
//     }

//     // Update the comment status
//     comment.status = status;
//     await comment.save();

//     res.status(200).json({ message: `Comment ${status}`, comment });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating comment status", error });
//   }
// };

// // @desc    Get a comment by id
// // @route   GET /v1/api/comments/:id
// // @access  Public
// const getCommentByIdHandler = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const comment = await Comment.findById(id)
//       .populate("author", "name")
//       .populate("post", "title")
//       .populate("parentComment");

//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     res.status(200).json(comment);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching comment", error });
//   }
// };

// // @desc    Get all comment for a specific post
// // @route   GET /v1/api/comments
// // @access  Public
// const getCommentsByPostHandler = async (req, res) => {
//   try {
//     const { postId } = req.params;

//     const comments = await Comment.find({ post: postId })
//       .populate("author", "name")
//       .populate("parentComment")
//       .sort({ createdAt: -1 }); // Sort by newest

//     if (!comments.length) {
//       return res
//         .status(404)
//         .json({ message: "No comments found for this post" });
//     }

//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching comments", error });
//   }
// };

// // @desc    Get All Comments (Filter by status)
// // @route   GET /v1/api/comments
// // @access  Public
// const getAllCommentsHandler = async (req, res) => {
//   try {
//     const { status } = req.query; // Optional filter for status

//     const query = {};
//     if (status) {
//       query.status = status; // Add status filter if provided
//     }

//     const comments = await Comment.find(query)
//       .populate("author", "name")
//       .populate("post", "title");

//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching comments", error });
//   }
// };

// // @desc    Update an existing comment
// // @route   PUT /v1/api/comment/:id
// // @access  Private (Authenticated user)
// const updateCommentHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;
//     const user = req.user;
//     const userId = user._id;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     if (!content) {
//       return res.status(400).json({ message: "Content is required" });
//     }

//     // Find the comment by ID
//     const comment = await Comment.findById(id);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     // Authorization: only the author can update the comment
//     if (comment.author.toString() !== userId.toString()) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update this comment" });
//     }

//     // Update the content
//     comment.content = content;
//     const updatedComment = await comment.save();

//     res.status(200).json({
//       message: "Comment updated successfully",
//       comment: updatedComment,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating comment", error });
//   }
// };

// // @desc    Delete a comment
// // @route   DELETE /v1/api/comments/:id
// // @access  Private (Admin, editor)
// const deleteCommentHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     const comment = await Comment.findById(id).populate({
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

//     // Authorization check: only admin, editor, author of post, postContributor, and author of comment can delete
//     if (
//       user.role !== "admin" &&
//       user.role !== "editor" &&
//       comment.post.author._id.toString() !== user._id.toString() &&
//       comment.post.postContributor._id.toString() !== user._id.toString() &&
//       comment.author.toString() !== user._id.toString()
//     ) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to delete this comment." });
//     }

//     await comment.deleteOne();
//     res.status(200).json({ message: "Comment deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting comment", error });
//   }
// };

// module.exports = {
//   createCommentHandler,
//   updateCommentStatusHandler,
//   getCommentByIdHandler,
//   getCommentsByPostHandler,
//   getAllCommentsHandler,
//   updateCommentHandler,
//   deleteCommentHandler,
// };
