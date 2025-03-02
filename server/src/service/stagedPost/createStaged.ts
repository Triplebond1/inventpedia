import { IPost } from "../../models/post";
import { IStagedPost } from "../../models/stagedPost";
import { StagedPost } from "../../models/stagedPost";
import { IUser } from "../../models/user";

// @desc    Create a new staged post
// @route   POST /v1/api/stagedPost
// @access  Private (Admin, editor, author and contributor)
export const createStagedPost = async (
  user: IUser,
  data: IPost,
  status?: string,
): Promise<IStagedPost> => {
  try {
    if (!user && !data) {
      throw new Error("user and data for staged post are required");
    }

    const allowedStatus = [
      "draft",
      "review",
    ];

    if (status && !allowedStatus.includes(status)) {
      throw new Error ("status is not allowed")
    }
    // Create the staged post
    const stagedPost = new StagedPost({
      postId: data._id,
      StagedPostAuthor: user._id,
      title: data.title,
      content: data.content,
      keyTakeAway: data.keyTakeAway,
      status: status? status : "draft",
      summary: data.summary,
      version: data.version.versionIndexList[-1],
      createdAt: Date.now,
    });

    // Save the staged post
    return await stagedPost.save();
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const createStagedPostForAdmin = async (
  user: IUser,
  data: IPost,
  status?: string
): Promise<IStagedPost> => {
  try {
    if (!user && !data) {
      throw new Error("user and data for staged post are required");
    }

    const allowedStatus = [
      "draft",
      "review",
      "reviewed",
    ];

    if (status && !allowedStatus.includes(status)) {
      throw new Error ("status is not allowed")
    }
    // Create the staged post
    const stagedPost = new StagedPost({
      postId: data._id,
      StagedPostAuthor: user._id,
      title: data.title || null,
      content: data.content || null,
      keyTakeAway: data.keyTakeAway || null,
      summary: data.summary || null,
      postContributor: data.postContributor || null,
      metaDescription: data.metaDescription || null,
      focusKeywords: data.focusKeywords || null,
      categories: data.categories || null,
      tags: data.tags || null,
      featuredImage: data.featuredImage || null,
      coverImage: data.coverImage || null,
      featuredVideo: data.featuredVideo || null,
      status: status? status : "draft",
      version: data.version.versionIndexList[-1],
      ownContent: data.ownContent || false,
      nextPost: data.nextPost || null,
      previousPost: data.previousPost || null,
      relatedPosts: data.relatedPosts || null,
      breadcrumbList: data.breadcrumbList || null,
      createdAt: Date.now,
    });

    // Save the staged post
    return await stagedPost.save();
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};
