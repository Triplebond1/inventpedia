// import Post from "../../models/post";
// import Category from "../../models/category";
// import Tag from "../../models/tag";
// import populateSchemaMarkup from "../../utilities/helpers/schemaMarkUp";

// // @desc    Create a new post
// // @route   POST /v1/api/post
// // @access  Private (admin, editor, author, contributor)
// const createPostHandler = async (req, res) => {
//   try {
//     let {
//       title,
//       content,
//       keyTakeAway,
//       summary,
//       slug,
//       postContributor,
//       metaDescription,
//       parentPage,
//       focuskeywords,
//       categories,
//       tags,
//       featuredImage,
//       coverImage,
//       postOtherImages,
//       featuredVideo,
//       status,
//       nextPage,
//       previousPage,
//       relatedPages,
//       breadcrumbList,
//     } = req.body;

//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     // Validate required fields
//     if (!title || !content) {
//       return res
//         .status(400)
//         .json({ message: "Title and content, are required." });
//     }
    
//     title = title.toLowerCase();
//     content = content.toLowerCase();

//     // Check user role and handle subscriber-specific logic
//     if (user?.role === "subscriber") {
//       return res
//         .status(403)
//         .json({ message: "subscriber cannot publish posts." });
//     }

//     // Validate categories, ensuring they are known and registered
//     if (categories && categories.length > 0) {
//       const validCategories = await Category.find({ _id: { $in: categories } });
//       if (validCategories.length !== categories.length) {
//         return res
//           .status(400)
//           .json({ message: "One or more categories are invalid." });
//       }
//     }

//     // Validate tags, ensuring they are known and registered
//     if (tags && tags.length > 0) {
//       const validTags = await Tag.find({ _id: { $in: tags } });
//       if (validTags.length !== tags.length) {
//         return res
//           .status(400)
//           .json({ message: "One or more tags are invalid." });
//       }
//     }

//     if (
//       (user.role === "admin" && user.role === "editor") ||
//       (user.role === "author" && status === "review")
//     ) {
//       status = status;
//     } else {
//       status = "draft";
//     }

//     // Create a new post instance
//     let newPost = new Post({
//       title,
//       content,
//       keyTakeAway,
//       summary,
//       slug,
//       author: user ? user._id.toString() : undefined,
//       postContributor,
//       metaDescription,
//       parentPage,
//       focuskeywords,
//       categories,
//       tags,
//       featuredImage,
//       coverImage,
//       postOtherImages,
//       featuredVideo,
//       status: status,
//       publishDate: status === "published" ? Date.now() : undefined,
//       nextPage,
//       previousPage,
//       relatedPages,
//       breadcrumbList,
//     });

//     const schemaMarkup = await populateSchemaMarkup(newPost);
//     newPost.schemaMarkup = schemaMarkup;

//     // Save the post and populate related fields
//     const savedPost = await newPost.save({ runValidators: true });
//     // Run validation before saving

//     // Respond with the newly created post
//     return res.status(201).json(savedPost);
//   } catch (error) {
//     console.error("Error creating post:", error);
//     res.status(500).json({ message: "Error creating post", error });
//   }
// };

// // @desc    Get a post by id
// // @route   GET /v1/api/post /:id
// // @access  Public
// const getAPostHandler = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate and set 'id' in the query if provided
//     if (id) {
//       if (typeof id !== "string") {
//         return res.status(400).json({
//           message: "'id' must be a string",
//         });
//       }
//     }

//     // Find post based on the constructed query
//     const post = await Post.findById(id)
//       .populate("author", "username") // Populate author field
//       .populate("categories", "name") // Populate categories
//       .populate("tags", "name") //populate tags
//       .populate("parentPost", "title") // Populate parentPost
//       .populate("relatedPosts", "postLink")
//       .populate("nextPost", "postLink")
//       .populate("previousPost", "postLink");

//     // Handle no post found
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     // Return the found post
//     res.status(200).json(post);
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     res.status(500).json({ message: "Error fetching post", error });
//   }
// };

// // @desc    Get all posts (with optional filtering by category, tag, date range)
// // @route   GET /v1/api/post
// // @access  Public
// const getAllPostsHandler = async (req, res) => {
//   try {
//     const { permalink, author, category, status, tag, startDate, endDate } =
//       req.query;

//     // Build query object
//     let query = {};

//     // Filter by status if provided
//     if (status) {
//       query.status = status;
//     }

//     // Filter by permalink if provided
//     if (permalink) {
//       (query.permalink = permalink)
//       console.log(query.permalink);
//     }

//     // Filter by author if provided
//     if (author) {
//       query.author = author;
//     }

//     // Filter by category
//     if (category) {
//       query.categories = category;
//     }

//     // Filter by tag
//     if (tag) {
//       query.tags = tag;
//     }

//     // Filter by specific day or date range
//     if (startDate || endDate) {
//       const start = new Date(startDate);
//       const end = endDate ? new Date(endDate) : new Date(startDate);
//       query.publishDate = {
//         $gte: start, // Greater than or equal to startDate
//         $lte: end, // Less than or equal to endDate (or the same day)
//       };
//     }

//     // Fetch posts with the applied filters
//     const posts = await Post.find(query)
//       .populate("author", "name",)
//       .populate("categories", "name")
//       .populate("tags", "name");

//     // If no posts found
//     if (!posts || posts.length === 0) {
//       return res.status(404).json({ message: "No posts found" });
//     }

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     res.status(500).json({ message: "Error fetching posts", error });
//   }
// };

// // @desc    change the status of post to publish, archived or draft
// // @route   Put /v1/api/post/status
// // @access  Private (Only admin, and editor should be able to update the status of a post)
// const updatePostStatusHandler = async (req, res) => {
//   try {
//     let { postId, status } = req.body;

//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }
//     // Check if the status is valid
//     if (
//       ![
//         "published",
//         "archived",
//         "draft",
//         "review",
//         "reviewed",
//         "rejected",
//       ].includes(status)
//     ) {
//       return res.status(400).json({ message: "Invalid status provided." });
//     }

//     // Fetch the post by ID
//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ message: "post not found." });
//     }

//     // Authorization check: only admin, editor and author can update post status
//     if (
//       user.role !== "admin" &&
//       user.role !== "editor" &&
//       user.role !== "author"
//     ) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update post status." });
//     }

//     // Check if user has permission to change the post status from current status
//     if (
//       ["admin", "editor"].includes(user.role) ||
//       (user.role === "author" &&
//         ((post.status === "reviewed" && status === "published") ||
//           (["archived", "draft", "rejected"].includes(post.status) &&
//             status === "review") ||
//           (["draft", "rejected"].includes(post.status) &&
//             status === "archived")))
//     ) {
//       // Allow status change
//       status = status;
//     } else {
//       // Revert to original status if conditions are not met
//       status = post.status;
//     }

//     // Update the post status
//     post.status = status;
//     await post.save();

//     res.status(200).json({ message: `post ${status}`, post });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating post status", error });
//   }
// };

// // @desc    Update an existing post
// // @route   PUT /v1/api/post/:id
// // @access  Private (Admin, editor, author and contributor)
// const updatePostHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;
//     let {
//       title,
//       content,
//       keyTakeAway,
//       summary,
//       postContributor,
//       metaDescription,
//       parentPost,
//       focuskeywords,
//       categories,
//       tags,
//       featuredImage,
//       coverImage,
//       postOtherImages,
//       featuredVideo,
//       status,
//       nextPost,
//       previousPost,
//       relatedPosts,
//       breadcrumbList,
//     } = req.body;


//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     // Check if the status is valid
//     if (
//       status &&
//       ![
//         "published",
//         "archived",
//         "draft",
//         "review",
//         "reviewed",
//         "rejected",
//       ].includes(status)
//     ) {
//       return res.status(400).json({ message: "Invalid status provided." });
//     }

//     // Fetch the post by ID
//     const post = await Post.findById(id);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found." });
//     }

//     // Authorization check: only admin, editor, author, or contributor can update the post
//     const allowedRoles = ["admin", "editor", "author"];
//     const isAuthorized =
//       allowedRoles.includes(user.role) ||
//       post.author.toString() === user._id.toString() ||
//       post.postContributor?.toString() === user._id.toString();

//     if (!isAuthorized) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update this post." });
//     }

//     // Check if user has permission to change the post status
//     if (
//       ["admin", "editor"].includes(user.role) ||
//       (user.role === "author" &&
//         ((post.status === "reviewed" && status === "published") ||
//           (["archived", "draft", "rejected"].includes(post.status) &&
//             status === "review") ||
//           (["draft", "rejected"].includes(post.status) &&
//             status === "archived")))
//     ) {
//       // Allow status change
//       status = status;
//     } else {
//       // Revert to original status if conditions are not met
//       status = post.status;
//     }

//     // Construct update data
//     let updateData = {
//       title: title || post.title,
//       content: content || post.content,
//       keyTakeAway: keyTakeAway || post.keyTakeAway,
//       summary: summary || post.summary,
//       postContributor: postContributor || post.postContributor,
//       metaDescription: metaDescription || post.metaDescription,
//       focuskeywords: focuskeywords || post.focuskeywords,
//       parentPost: parentPost || post.parentPost,
//       categories: categories || post.categories,
//       tags: tags || post.tags,
//       featuredImage: featuredImage || post.featuredImage,
//       coverImage: coverImage || post.coverImage,
//       postOtherImages: postOtherImages || post.postOtherImages,
//       featuredVideo: featuredVideo || post.featuredVideo,
//       status: status,
//       publishDate: status === "published" ? Date.now() : undefined,
//       nextPost: nextPost || post.nextPost,
//       previousPost: previousPost || post.previousPost,
//       relatedPosts: relatedPosts || post.relatedPosts,
//       breadcrumbList,
//     };

//     const schemaMarkup = await populateSchemaMarkup(updateData);
//     updateData.schemaMarkup = schemaMarkup;
//     // Update the post with new data
//     const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
//       new: true, // Return the updated document
//       runValidators: true, // Run validation checks
//     })
//       .populate("author", "username") // Populate author field
//       .populate("categories", "name") // Populate categories
//       .populate("tags", "name") //populate tags
//       .populate("parentPost", "title") // Populate parentPost
//       .populate("relatedPosts", "postLink")
//       .populate("nextPost", "postLink")
//       .populate("previousPost", "postLink");

//     // Return success response
//     res.status(200).json({
//       message: "Post updated successfully.",
//       post: updatedPost,
//     });
//   } catch (error) {
//     console.error("Error updating post:", error);
//     res.status(500).json({ message: "Error updating post.", error });
//   }
// };

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
