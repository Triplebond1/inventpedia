// import  Category from "../../models/category";

// // @desc    Create a new category
// // @route   POST /v1/api/categories
// // @access  Private (admin, editor)
// const createCategoryHandler = async (req, res) => { 
//   try {
//     const { name, description } = req.body;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }
//     // Authorization check: only admin, and editor can create a tag
//     if (user.role !== "admin" && user.role !== "editor") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to create a category" });
//       }
      
//     // Check if name is provided
//     if (!name) {
//       return res.status(400).json({ message: "Category name is required" });
//     }

//     // Create a new category
//     const newCategory = new Category({ name, description });
//     const savedCategory = await newCategory.save();

//     res.status(201).json({
//       message: "Category created successfully",
//       category: savedCategory,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       // Handle unique constraint violation
//       return res.status(409).json({ message: "Category already exists" });
//     }
//     res.status(500).json({ message: "Error creating category", error });
//   }
// };

// // @desc    Get a category by id
// // @route   GET /v1/api/category/:id
// // @access  Public
// const getCategoryByIdHandler = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find category by ID
//     const category = await Category.findById(id);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.status(200).json(category);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching category", error });
//   }
// };

// // @desc    Get all categories
// // @route   GET /v1/api/category
// // @access  Public
// const getAllCategoriesHandler = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).json(categories);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching categories", error });
//   }
// };

// // @desc    Update an existing category
// // @route   PUT /v1/api/category/:id
// // @access  Private (Admin, and editor)
// const updateCategoryHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description } = req.body;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }
//     // Authorization check: only admin, and editor can create a tag
//     if (user.role !== "admin" && user.role !== "editor") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update a category" });
//     }

//     // Check if name is provided
//     if (!name && !description) {
//       return res.status(400).json({ message: "Category name or description is required" });
//     }

//     // Update category
//     const updatedCategory = await Category.findByIdAndUpdate(
//       id,
//       { name, description },
//       { new: true, runValidators: true }
//     );

//     if (!updatedCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.status(200).json({
//       message: "Category updated successfully",
//       category: updatedCategory,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(409).json({ message: "Category already exists" });
//     }
//     res.status(500).json({ message: "Error updating category", error });
//   }
// };

// // @desc    Delete a category
// // @route   DELETE /v1/api/category/:id
// // @access  Private (Admin, editor)
// const deleteCategoryHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "User is not authenticated" });
//     }
//     // Authorization check: only admin, and editor can create a tag
//     if (user.role !== "admin" && user.role !== "editor") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update a category" });
//     }

//     // Delete the category
//     const deletedCategory = await Category.findByIdAndDelete(id);
//     if (!deletedCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.status(200).json({ message: "Category deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting category", error });
//   }
// };

// module.exports = {
//   createCategoryHandler,
//   getCategoryByIdHandler,
//   getAllCategoriesHandler,
//   updateCategoryHandler,
//   deleteCategoryHandler,
// };
