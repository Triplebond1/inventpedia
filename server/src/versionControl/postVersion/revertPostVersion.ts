import Post from "../../models/post";
import { PostVersion } from "../../models/postVersioning";
import {
  validateField,
  validateRequiredField,
} from "../../utilities/helpers/validateField";

export const revertPostVersion = async (
  postId: string,
  versionId?: number,
  lastVersionId?: boolean
) => {
  try {
    // Validate required fields
    validateRequiredField(postId, "post ID", "string");
    validateField(versionId, "version ID", "number");
    validateField(lastVersionId, "last version", "boolean");

    // Ensure only one of versionId or lastVersionId is provided
    if (!lastVersionId && versionId === undefined) {
      throw new Error("Version ID is required to revert post");
    }
    
    if (lastVersionId && versionId !== undefined) {
      throw new Error(
        "Only one of last version ID or version ID is required to revert post"
      );
    }

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    // Determine the last version index
    const lastVersion = post.version.versionIndexList.length - 1;

    // Use the last version if lastVersionId is true
    if (lastVersionId) {
      versionId = lastVersion;
    }

    const versionIndex = versionId || lastVersion;

    // Validate the version index
    if (
      versionIndex < 0 ||
      versionIndex >= post.version.versionIndexList.length
    ) {
      throw new Error("Invalid version index");
    }

    // Get the version number from the version index
    const versionNumber = post.version.versionIndexList[versionIndex];
    if (!versionNumber) {
      throw new Error("Version not found");
    }

    // Find the post versions by postId
    const postVersions = await PostVersion.findOne({ postId: postId });
    if (!postVersions) {
      throw new Error("Version not found");
    }

    // Find the specific version in the version list
    const version = postVersions.versionList.find(
      (v) => v.version === versionNumber
    );
    if (!version) {
      throw new Error("Version not found");
    }

    // Revert the post fields to the selected version
    post.title = version.title;
    post.content = version.content;
    post.schemaMarkup = version.schemaMarkup;
    post.keyTakeAway = version.keyTakeAway;
    post.summary = version.summary;
    post.slug = version.slug;
    post.parentPost = version.parentPost;
    post.permalink = version.permalink;
    post.postContributor = version.postContributor;
    post.metaDescription = version.metaDescription;
    post.focusKeywords = version.focusKeywords;
    post.featuredImage = version.featuredImage;
    post.featuredVideo = version.featuredVideo;

    // Save the reverted post
    const newPost = await post.save();

    return newPost;
  } catch (error: any) {
    console.error("Error reverting post:", error);
    throw error;
  }
};
