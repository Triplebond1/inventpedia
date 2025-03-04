// import express from "express";
// const router = express.Router();
// import { validateToken } from "../../middlewares/v1/auth";
// import { authorize } from "../../middlewares/v1/authorize";
// import {
//   createPageHandler,
//   getAllPageHandler,
//   getAPageHandler,
//   updatePageStatusHandler,
//   updatePageHandler,
//   deletePageHandler,
// } from "../../controllers/v1/pageController";


// // @desc    Create a new page
// // @route   POST /v1/api/page
// // @access  Private (admin, editor, author, contributor)
// router.post(
//   "",
//   validateToken,
//   authorize("admin", "editor", "author", "contributor"),
//   createPageHandler
// );

// // @desc    Get a page with id
// // @route   GET /v1/api/page /:id
// // @access  Public
// router.get("/:id", getAPageHandler);

// // @desc    Get a page with permalink
// // @route   GET /v1/api/page/:permalink
// // @access  Public
// router.get("/:permalink", getAPageHandler);

// // @desc    Get all pages (with optional filtering by  author, category, status, tag, and date range)
// // @route   GET /v1/api/page
// // @access  Public
// router.get("/", getAllPageHandler);

// // @desc    change the status of page to publish, archived or draft
// // @route   Put /v1/api/page/status
// // @access  Private (Only admin, and editor should be able to update the status of a page)
// router.put(
//   "/status",
//   validateToken,
//   authorize("admin", "editor"),
//   updatePageStatusHandler
// );
// // @desc    Update an existing page
// // @route   PUT /v1/api/page/:id
// // @access  Private (Admin, editor and author)
// router.put(
//   "/:id",
//   validateToken,
//   authorize("admin", "editor", "author", "contributor"),
//   updatePageHandler
// );

// // @desc    Delete a page
// // @route   DELETE /v1/api/page/:id
// // @access  Private (Admin, editor and author)
// router.delete(
//   "/:id",
//   validateToken,
//   authorize("admin", "editor", "author"),
//   deletePageHandler
// );

// module.exports = router;
