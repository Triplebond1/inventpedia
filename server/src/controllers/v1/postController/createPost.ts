import Post, { IPost } from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import Category from "../../../models/category";
import { status } from "../../../utilities/enums/statusCode";
import Tag from "../../../models/tag";
import { populateSchemaMarkup } from "../../../utilities/helpers/schemaMarkUp";

const statusCode = status;
// @desc    Create a new post
// @route   POST /v1/api/post
// @access  Private (admin, editor, author, contributor)
export const createPostHandler = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    let {
      title,
      content,
      keyTakeAway,
      summary,
      slug,
      postContributor,
      metaDescription,
      parentPost,
      focusKeywords,
      categories,
      tags,
      featuredImage,
      ownContent,
      coverImage,
      featuredVideo,
      status,
      nextPost,
      previousPost,
      relatedPosts,
      breadcrumbList,
    }: IPost = req.body;

    const user = req.user;

    if (!user) {
      return res
        .status(statusCode.Unauthorized)
        .json({ message: "User is not authenticated" });
    }

    // Validate required fields
    if (!title || !content) {
      return res
        .status(statusCode.BadRequest)
        .json({ message: "Title and content, are required." });
    }

    title = title.toLowerCase();
    content = content.toLowerCase();

    // Check user role and handle subscriber-specific logic
    if (user?.role === "subscriber" || user?.role === "guest") {
      return res
        .status(statusCode.AccessDenied)
        .json({ message: "your are not eligible to create posts." });
    }

    // Validate categories, ensuring they are known and registered
    if (categories && categories.length > 0) {
      const validCategories = await Category.find({ _id: { $in: categories } });
      if (validCategories.length !== categories.length) {
        return res
          .status(statusCode.BadRequest)
          .json({ message: "One or more categories are invalid." });
      }
    }

    // Validate tags, ensuring they are known and registered
    if (tags && tags.length > 0) {
      const validTags = await Tag.find({ _id: { $in: tags } });
      if (validTags.length !== tags.length) {
        return res
          .status(statusCode.BadRequest)
          .json({ message: "One or more tags are invalid." });
      }
    }

    // Validate status
    if (
      user.role === "admin" ||
      user.role === "editor" ||
      (user.role === "author" && status === "review")
    ) {
      status = status;
    } else {
      status = "draft";
    }

    // Create a new post instance
    let newPost = new Post({
      title: title,
      content: content,
      keyTakeAway: keyTakeAway || null,
      summary: summary || null,
      slug: slug,
      author: user ? (user._id as string).toString() : null,
      postContributor: postContributor || null,
      metaDescription: metaDescription || null,
      parentPost: parentPost || null,
      focusKeywords: focusKeywords || null,
      categories: categories || null,
      tags: tags || null,
      featuredImage: featuredImage || null,
      coverImage: coverImage || null,
      featuredVideo: featuredVideo || null,
      status: status,
      publishDate: status === "published" ? Date.now() : null,
      version: {
        versionIndexList: [1],
      },
      owncontent: ownContent || false,
      lastModifiedDate: Date.now(),
      nextPost: nextPost || null,
      previousPost: previousPost || null,
      relatedPosts: relatedPosts || null,
      breadcrumbList: breadcrumbList || null,
    });

    // Update schemaMarkup
    newPost.schemaMarkup = await populateSchemaMarkup(newPost);

    // Save the post and populate related fields
    const savedPost = await newPost.save({ validateBeforeSave: true });
    // Run validation before saving

    // Respond with the newly created post
    return res.status(statusCode.Created).json(savedPost);
    
  } catch (error: any) {
    console.error("Error creating post:", error);
    return res
      .status(statusCode.ServerError)
      .json({ message: "Error creating post", error });
  }
};
