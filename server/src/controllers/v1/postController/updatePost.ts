import Post from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { response, Response } from "express";
import { status } from "../../../utilities/enums/statusCode";
import { IPost } from "../../../models/post";
const resStatus = status;

// @desc    Update an existing post
// @route   PUT /v1/api/post/:id
// @access  Private (Admin, editor, author and contributor)
export const updatePostHandler = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = req.user;
    let {
      title,
      content,
      keyTakeAway,
      summary,
      postContributor,
      metaDescription,
      parentPost,
      focusKeywords,
      categories,
      tags,
      featuredImage,
      coverImage,
      postOtherImages,
      featuredVideo,
      status,
      nextPost,
      previousPost,
      relatedPosts,
      breadcrumbList,
    }: IPost = req.body;

    if (!user) {
      return res
        .status(resStatus.Unauthorized)
        .json({ message: "User is not authenticated" });
    }

    // Check if the status is valid
    if (
      status &&
      ![
        "published",
        "archived",
        "draft",
        "review",
        "reviewed",
        "rejected",
      ].includes(status)
    ) {
      return res.status(resStatus.BadRequest).json({ message: "Invalid status provided." });
    }

    // Fetch the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(resStatus.NotFound).json({ message: "Post not found." });
    }

    // Authorization check: only admin, editor, author, or contributor can update the post
    const allowedRoles = ["admin", "editor", "author"];
    const isAuthorized =
      allowedRoles.includes(user.role) ||
      post.author.toString() === (user._id as string).toString() ||
      post.postContributor?.toString() === (user._id as string).toString();

    if (!isAuthorized) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post." });
    }

    // Check if user has permission to change the post status
    if (
      ["admin", "editor"].includes(user.role) ||
      (user.role === "author" &&
        ((post.status === "reviewed" && status === "published") ||
          (["archived", "draft", "rejected"].includes(post.status) &&
            status === "review") ||
          (["draft", "rejected"].includes(post.status) &&
            status === "archived")))
    ) {
      // Allow status change
      status = status;
    } else {
      // Revert to original status if conditions are not met
      status = post.status;
    }

    // Construct update data
    let updateData = {
      title: title || post.title,
      content: content || post.content,
      keyTakeAway: keyTakeAway || post.keyTakeAway,
      summary: summary || post.summary,
      postContributor: postContributor || post.postContributor,
      metaDescription: metaDescription || post.metaDescription,
      focuskeywords: focusKeywords || post.focusKeywords,
      parentPost: parentPost || post.parentPost,
      categories: categories || post.categories,
      tags: tags || post.tags,
      featuredImage: featuredImage || post.featuredImage,
      coverImage: coverImage || post.coverImage,
      postOtherImages: postOtherImages || post.postOtherImages,
      featuredVideo: featuredVideo || post.featuredVideo,
      status: status,
      publishDate: status === "published" ? Date.now() : undefined,
      nextPost: nextPost || post.nextPost,
      previousPost: previousPost || post.previousPost,
      relatedPosts: relatedPosts || post.relatedPosts,
      breadcrumbList,
    };

    // Update the post with new data
    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation checks
    })
      .populate("author", "username") // Populate author field
      .populate("categories", "name") // Populate categories
      .populate("tags", "name") //populate tags
      .populate("parentPost", "title") // Populate parentPost
      .populate("relatedPosts", "postLink")
      .populate("nextPost", "postLink")
      .populate("previousPost", "postLink");

    // Return success response
    return res.status(200).json({
      message: "Post updated successfully.",
      post: updatedPost,
    });
  } catch (error: any) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Error updating post.", error });
  }
};
