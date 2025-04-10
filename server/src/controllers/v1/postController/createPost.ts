import Post, { IPost } from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import Category from "../../../models/category";
import { status } from "../../../utilities/enums/statusCode";
import Tag from "../../../models/tag";
import { populateSchemaMarkup } from "../../../utilities/helpers/schemaMarkUp";
import {
  validateField,
  validateRequiredField,
} from "../../../utilities/helpers/validateField";

const statusCode = status;
// @desc    Create a new post
// @route   POST /v1/api/post
// @access  Private (admin, editor, author, contributor)
export const createPostHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
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
       res
        .status(statusCode.Unauthorized)
        .json({ message: "User is not authenticated" });
        return;
    }

    // Validate required fields
    validateRequiredField(title, "Title", "string");
    validateRequiredField(content, "Content", "string");

    //validate fields
    validateField(keyTakeAway, "Key Take Away", "string");
    validateField(summary, "Summary", "string");
    validateField(slug, "Slug", "string");
    validateField(postContributor, "Post Contributor", "string");
    validateField(metaDescription, "Meta Description", "string");
    validateField(parentPost, "Parent Post", "string");
    validateField(focusKeywords, "Focus Keywords", "string");
    validateField(featuredImage, "Featured Image", "string");
    validateField(coverImage, "Cover Image", "string");
    validateField(featuredVideo, "Featured Video", "string");
    validateField(status, "Status", "string");
    validateField(nextPost, "Next Post", "string");
    validateField(previousPost, "Previous Post", "string");
    validateField(relatedPosts, "Related Posts", "string");
    validateField(breadcrumbList, "Breadcrumb List", "string");

    title = title.toLowerCase();
    content = content.toLowerCase();

    // Check user role and handle subscriber-specific logic
    if (user?.role === "subscriber" || user?.role === "guest") {
    res
        .status(statusCode.AccessDenied)
        .json({ message: "your are not eligible to create posts." });
        return;
    }

    // Validate categories, ensuring they are known and registered
    if (categories && categories.length > 0) {
      const validCategories = await Category.find({ _id: { $in: categories } });
      if (validCategories.length !== categories.length) {
         res
          .status(statusCode.BadRequest)
          .json({ message: "One or more categories are invalid." });
          return;
      }
    }

    // Validate tags, ensuring they are known and registered
    if (tags && tags.length > 0) {
      const validTags = await Tag.find({ _id: { $in: tags } });
      if (validTags.length !== tags.length) {
        res
          .status(statusCode.BadRequest)
          .json({ message: "One or more tags are invalid." });
          return;
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
    res.status(statusCode.Created).json(savedPost);
    return;
  } catch (error: any) {
    console.error("Error creating post:", error);
    res
      .status(statusCode.ServerError)
      .json({ message: "Error creating post", error: error.message });
      return;
  }
};
