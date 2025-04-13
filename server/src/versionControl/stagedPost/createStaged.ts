import { IPost } from "../../models/post";
import { IStagedPost } from "../../models/stagedPost";
import { StagedPost } from "../../models/stagedPost";
import { IUser } from "../../models/user";

// @desc    Create a new staged post
// @route   POST /v1/api/stagedPost
// @access  Private (Admin, editor, author and contributor)
export const createStagedPost = async (
  user: IUser,
  postData: IPost,
  data: IPost,
  status?: string
): Promise<IStagedPost> => {
  try {
    if (!user && !data) {
      throw new Error("user and data for staged post are required");
    }

    const allowedStatus = ["draft", "review"];

    if (status && !allowedStatus.includes(status)) {
      throw new Error("status is not allowed");
    }

    // Create the staged post
    const stagedPost = new StagedPost({
      postId: postData._id,
      stagedPostAuthor: user._id,
      title: data.title,
      content: data.content,
      slug: data.slug,
      keyTakeAway: data.keyTakeAway,
      status: status ? status : "draft",
      summary: data.summary,
      versionEdited:
        postData.version.versionIndexList[
          postData.version.versionIndexList.length - 1
        ],
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
  postData: IPost,
  data: IPost,
  status?: string
): Promise<IStagedPost> => {
  try {
    if (!user && !data) {
      throw new Error("user and data for staged post are required");
    }

    // Create the staged post
    const stagedPost = new StagedPost({
      postId: postData._id,
      stagedPostAuthor: user._id,
      title: data.title,
      content: data.content,
      keyTakeAway: data.keyTakeAway,
      summary: data.summary,
      slug: data.slug,
      postContributor: data.postContributor,
      metaDescription: data.metaDescription,
      focusKeywords: data.focusKeywords,
      categories: data.categories,
      tags: data.tags,
      featuredImage: data.featuredImage,
      coverImage: data.coverImage,
      featuredVideo: data.featuredVideo,
      status: status ? status : "draft",
      versionEdited:
        postData.version.versionIndexList[
          postData.version.versionIndexList.length - 1
        ],
      ownContent: data.ownContent || false,
      nextPost: data.nextPost,
      previousPost: data.previousPost,
      relatedPosts: data.relatedPosts,
      breadcrumbList: data.breadcrumbList,
    });

    // Save the staged post
    return await stagedPost.save();
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};
