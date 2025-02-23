// import Post from "../../models/post";
// import Category from "../../models/category";
// import Tag from "../../models/tag";
// import populateSchemaMarkup from "../../utilities/helpers/schemaMarkUp";


// // @desc    Delete a post
// // @route   DELETE /v1/api/post/:id
// // @access  Private (Admin, editor and author)
// const deletePostHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     // Find the post to delete
//     const post = await Post.findById(id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     // Check if the user is an admin, editor, or the author of the post
//     if (
//       user.role !== "admin" &&
//       user.role !== "editor" &&
//       post.author.toString() !== user._id.toString()
//     ) {
//       return res
//         .status(403)
//         .json({ message: "You do not have permission to delete this post" });
//     }

//     // Delete the post
//     await post.deleteOne();

//     res.status(200).json({ message: "Post deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     res.status(500).json({ message: "Error deleting post", error });
//   }
// };

// module.exports = {
//   createPostHandler,
//   getAllPostsHandler,
//   getAPostHandler,
//   updatePostStatusHandler,
//   updatePostHandler,
//   deletePostHandler,
// };
