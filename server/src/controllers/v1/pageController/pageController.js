// import Page from "../../models/page";
// import Category from "../../models/category";
// import Tag from "../../models/tag";
// import populateSchemaMarkup from "../../utilities/helpers/schemaMarkUp";

// // @desc    Create a new page
// // @route   POST /v1/api/pages
// // @access  Private (admin, editor, author, contributor)
// const createPageHandler = async (req, res) => {
//   try {
//     let {
//       title,
//       content,
//       keyTakeAway,
//       summary,
//       slug,
//       pageContributor,
//       metaDescription,
//       parentPage,
//       focuskeywords,
//       categories,
//       tags,
//       featuredImage,
//       coverImage,
//       pageOtherImages,
//       featuredVideo,
//       status,
//       nextPage,
//       previousPage,
//       relatedPages,
//       breadcrumbList,
//       social,
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
//     if (user.role === "subscriber") {
//       return res
//         .status(403)
//         .json({ message: "subscriber cannot publish page." });
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

//     let newPage = new Page({
//       title,
//       content,
//       keyTakeAway,
//       summary,
//       slug,
//       author: user ? user._id.toString() : undefined,
//       pageContributor,
//       metaDescription,
//       parentPage,
//       focuskeywords,
//       categories,
//       tags,
//       featuredImage,
//       coverImage,
//       pageOtherImages,
//       featuredVideo,
//       status,
//       nextPage,
//       previousPage,
//       relatedPages,
//       breadcrumbList,
//       social,
//       publishDate: status === "published" ? Date.now() : undefined,
//     });

//     const schemaMarkup = await populateSchemaMarkup(newPage);
//     newPage.schemaMarkup = schemaMarkup;

//     await newPage.save({ runValidators: true });

//     res
//       .status(201)
//       .json({ message: "Page created successfully", page: newPage });
//   } catch (error) {
//     console.error("Error creating page:", error);
//     res.status(500).json({ message: "Error creating page", error });
//   }
// };

// // @desc    Get a page by id
// // @route   GET /v1/api/pages :id
// // @access  Public
// const getAPageHandler = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate type of 'id'  if provided
//     if (id && typeof id !== "string") {
//       return res.status(400).json({
//         message: "'id' must be a string",
//       });
//     }

//     // Find page based on the constructed query
//     const page = await Page.findById(id)
//       .populate("author", "username") // Populate author field
//       .populate("categories", "name") // Populate categories
//       .populate("tags", "name") //populate tags
//       .populate("parentPage", "title") // Populate parentPost
//       .populate("relatedPages", "postLink")
//       .populate("nextPage", "postLink")
//       .populate("previousPage", "postLink");

//     // Handle no page found
//     if (!page) {
//       return res.status(404).json({ message: "Page not found" });
//     }

//     // Return the found page
//     res.status(200).json(page);
//   } catch (error) {
//     console.error("Error fetching page:", error);
//     res.status(500).json({ message: "Error fetching page", error });
//   }
// };

// // @desc    Get all page (with optional filtering by category, tag, date range)
// // @route   GET /v1/api/page
// // @access  Public
// const getAllPageHandler = async (req, res) => {
//   try {
//     const {
//       permalink,
//       pageLink,
//       author,
//       category,
//       status,
//       tag,
//       startDate,
//       endDate,
//     } = req.query;

//     // Build query object
//     let query = {};

//     // Filter by status if provided
//     if (status) {
//       query.status = status;
//     }

//     // Filter by permalink if provided
//     if (permalink) {
//       (query.permalink = permalink)
//         console.log(query.permalink);
//     }

//     // Filter by pagelink if provided
//     if (pageLink) {
//       (query.pageLink = pageLink);
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

//     // Fetch page with the applied filters
//     const page = await Page.find(query)
//     .populate("author", "username") // Populate author field
//     .populate("categories", "name") // Populate categories
//     .populate("tags", "name") //populate tags
//     .populate("parentPage", "title") // Populate parentPost
//     .populate("relatedPages", "postLink")
//     .populate("nextPage", "postLink")
//     .populate("previousPage", "postLink");

//     // If no page found
//     if (!page || page.length === 0) {
//       return res.status(404).json({ message: "No page found" });
//     }

//     res.status(200).json(page);
//   } catch (error) {
//     console.error("Error fetching page:", error);
//     res.status(500).json({ message: "Error fetching page", error });
//   }
// };

// // @desc    change the status of page to publish, archived or draft
// // @route   Put /v1/api/page/status
// // @access  Private (Only admin, and editor should be able to update the status of a page)
// const updatePageStatusHandler = async (req, res) => {
//   try {
//     let { pageId, status } = req.body;

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

//     // Fetch the page by ID
//     const page = await Page.findById(pageId);

//     if (!page) {
//       return res.status(404).json({ message: "page not found." });
//     }

//     // Authorization check: only admin, editor and author can update page status
//     if (
//       user.role !== "admin" &&
//       user.role !== "editor" &&
//       user.role !== "author"
//     ) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update page status." });
//     }

//     // Check if user has permission to change the page status from current status
//     if (
//       ["admin", "editor"].includes(user.role) ||
//       (user.role === "author" &&
//         ((page.status === "reviewed" && status === "published") ||
//           (["archived", "draft", "rejected"].includes(page.status) &&
//             status === "review") ||
//           (["draft", "rejected"].includes(page.status) &&
//             status === "archived")))
//     ) {
//       // Allow status change
//       status = status;
//     } else {
//       // Revert to original status if conditions are not met
//       status = page.status;
//     }

//     // Update the page status
//     page.status = status;
//     await page.save();

//     res.status(200).json({ message: `page ${status}`, page });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating page status", error });
//   }
// };

// // @desc    Update an existing page
// // @route   PUT /v1/api/page/:id
// // @access  Private (Admin, editor, author and contributor)
// const updatePageHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;
//     let {
//       title,
//       content,
//       keyTakeAway,
//       summary,
//       pageContributor,
//       metaDescription,
//       parentPost,
//       focuskeywords,
//       categories,
//       tags,
//       featuredImage,
//       coverImage,
//       pageOtherImages,
//       featuredVideo,
//       status,
//       nextPage,
//       previousPage,
//       relatedPages,
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

//     // Fetch the page by ID
//     const page = await Page.findById(id);
//     if (!page) {
//       return res.status(404).json({ message: "Page not found." });
//     }

//     // Authorization check: only admin, editor, author, or contributor can update the page
//     const allowedRoles = ["admin", "editor", "author"];
//     const isAuthorized =
//       allowedRoles.includes(user.role) ||
//       page.author.toString() === user._id.toString() ||
//       page.pageContributor?.toString() === user._id.toString();

//     if (!isAuthorized) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update this page." });
//     }

//     // Check if user has permission to change the page status
//     if (
//       ["admin", "editor"].includes(user.role) ||
//       (user.role === "author" &&
//         ((page.status === "reviewed" && status === "published") ||
//           (["archived", "draft", "rejected"].includes(page.status) &&
//             status === "review") ||
//           (["draft", "rejected"].includes(page.status) &&
//             status === "archived")))
//     ) {
//       // Allow status change
//       status = status;
//     } else {
//       // Revert to original status if conditions are not met
//       status = page.status;
//     }

//     // Construct update data
//     let updateData = {
//       title: title || page.title,
//       content: content || page.content,
//       keyTakeAway: keyTakeAway || page.keyTakeAway,
//       summary: summary || page.summary,
//       pageContributor: pageContributor || page.pageContributor,
//       metaDescription: metaDescription || page.metaDescription,
//       focuskeywords: focuskeywords || page.focuskeywords,
//       parentPost: parentPost || page.parentPost,
//       categories: categories || page.categories,
//       tags: tags || page.tags,
//       featuredImage: featuredImage || page.featuredImage,
//       coverImage: coverImage || page.coverImage,
//       pageOtherImages: pageOtherImages || page.pageOtherImages,
//       featuredVideo: featuredVideo || page.featuredVideo,
//       status: status,
//       publishDate: status === "published" ? Date.now() : undefined,
//       nextPage: nextPage || page.nextPage,
//       previousPage: previousPage || page.previousPage,
//       relatedPages: relatedPages || page.relatedPages,
//       breadcrumbList,
//     };

//     const schemaMarkup = await populateSchemaMarkup(updateData);
//     updateData.schemaMarkup = schemaMarkup;

//     // Update the page with new data
//     const updatedPage = await Page.findByIdAndUpdate(id, updateData, {
//       new: true, // Return the updated document
//       runValidators: true, // Run validation checks
//     })
//       .populate("author", "username") // Populate author field
//       .populate("categories", "name") // Populate categories
//       .populate("tags", "name") //populate tags
//       .populate("parentPage", "title") // Populate parentPost
//       .populate("relatedPages", "postLink")
//       .populate("nextPage", "postLink")
//       .populate("previousPage", "postLink");

//     // Return success response
//     res.status(200).json({
//       message: "Page updated successfully.",
//       page: updatedPage,
//     });
//   } catch (error) {
//     console.error("Error updating page:", error);
//     res.status(500).json({ message: "Error updating page.", error });
//   }
// };

// // @desc    Delete a page
// // @route   DELETE /v1/api/page/:id
// // @access  Private (Admin, editor and author)
// const deletePageHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     // Find the page to delete
//     const page = await Page.findById(id);

//     if (!page) {
//       return res.status(404).json({ message: "Page not found" });
//     }

//     // Check if the user is an admin, editor, or the author of the page
//     if (
//       user.role !== "admin" &&
//       user.role !== "editor" &&
//       page.author.toString() !== user._id.toString()
//     ) {
//       return res
//         .status(403)
//         .json({ message: "You do not have permission to delete this page" });
//     }

//     // Delete the page
//     await page.deleteOne();

//     res.status(200).json({ message: "Page deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting page:", error);
//     res.status(500).json({ message: "Error deleting page", error });
//   }
// };

// module.exports = {
//   createPageHandler,
//   getAllPageHandler,
//   getAPageHandler,
//   updatePageStatusHandler,
//   updatePageHandler,
//   deletePageHandler,
// };
