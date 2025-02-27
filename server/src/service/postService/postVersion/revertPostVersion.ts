import { Response, Request } from "express";
import Post from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { PostVersion } from "../../../models/postVersioning";
import { status } from "../../../utilities/enums/statusCode";

export const revertPostVersion = async (req: AuthRequest, res: Response) => {
  const { postId, versionIndex }: { postId: string; versionIndex: number } =
    req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(status.NotFound).json({ message: "Post not found" });
    }

    if (
      versionIndex < 0 ||
      versionIndex >= post.version.versionIndexList.length
    ) {
      return res
        .status(status.BadRequest)
        .json({ message: "Invalid version index" });
    }
    const versionNumber = post.version.versionIndexList[versionIndex];
    if (!versionNumber) {
      return res.status(status.NotFound).json({ message: "Version not found" });
    }

    const postVersions = await PostVersion.findOne({ postId: postId });
    if (!postVersions) {
      return res.status(status.NotFound).json({ message: "Version not found" });
    }

    const version = postVersions.versionList.find(
      (v) => v.version === versionNumber
    );
    if (!version) {
      return res.status(status.NotFound).json({ message: "Version not found" });
    }

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

    await post.save();
    return res.status(status.Success).json(post);
  } catch (error: any) {
    console.error("Error reverting post:", error);
    return res
      .status(status.ServerError)
      .json({ message: "Error reverting post", error });
  }
};
