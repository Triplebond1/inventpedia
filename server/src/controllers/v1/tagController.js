// import Tag from "../../models/tag";


// // @desc    Create a new Tag
// // @route   POST /v1/api/tag
// // @access  Private (admin, editor)
// const createTagHandler = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }
//     if (!name) {
//       return res.status(400).json({ message: "Tag name is required" });
//     }

//     // Authorization check: only admin, and editor can create a tag
//     if (user.role !== "admin" && user.role !== "editor") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to create a tag" });
//     }
//     // Create new tag
//     const newTag = new Tag({ name });
//     const savedTag = await newTag.save();

//     res.status(201).json(savedTag);
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(409).json({ message: "Tag already exists" });
//     }
//     res.status(500).json({ message: "Error creating tag", error });
//   }
// };

// // @desc    Get a tag by id
// // @route   GET /v1/api/tags/:id
// // @access  Public
// const getTagByIdHandler = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const tag = await Tag.findById(id);

//     if (!tag) {
//       return res.status(404).json({ message: "Tag not found" });
//     }

//     res.status(200).json(tag);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tag", error });
//   }
// };

// // @desc    Get all tags
// // @route   GET /v1/api/tag
// // @access  Public
// const getAllTagsHandler = async (req, res) => {
//   try {
//     const tags = await Tag.find();
//     res.status(200).json(tags);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tags", error });
//   }
// };

// // @desc    Update an existing tag
// // @route   PUT /v1/api/tag/:id
// // @access  Private (Admin, and editor)
// const updateTagHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }

//     if (!name) {
//       return res.status(400).json({ message: "Tag name is required" });
//     }

//     // Authorization check: only admin, and editor can update a tag
//     if (user.role !== "admin" && user.role !== "editor") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to create a tag" });
//     }

//     const updatedTag = await Tag.findByIdAndUpdate(
//       id,
//       { name },
//       { new: true, runValidators: true }
//     );

//     if (!updatedTag) {
//       return res.status(404).json({ message: "Tag not found" });
//     }

//     res.status(200).json(updatedTag);
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(409).json({ message: "Tag already exists" });
//     }
//     res.status(500).json({ message: "Error updating tag", error });
//   }
// };

// // @desc    Delete a tag
// // @route   DELETE /v1/api/tag/:id
// // @access  Private (Admin, editor)
// const deleteTagHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }
//     // Authorization check: only admin, and editor can update a tag
//     if (user.role !== "admin" && user.role !== "editor") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to create a tag" });
//     }

//     const deletedTag = await Tag.findByIdAndDelete(id);

//     if (!deletedTag) {
//       return res.status(404).json({ message: "Tag not found" });
//     }

//     res.status(200).json({ message: "Tag deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting tag", error });
//   }
// };

// module.exports = {
//   createTagHandler,
//   getTagByIdHandler,
//   getAllTagsHandler,
//   updateTagHandler,
//   deleteTagHandler,
// }