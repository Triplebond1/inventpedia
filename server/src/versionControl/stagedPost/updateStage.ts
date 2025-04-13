import { IStagedPost, StagedPost } from "../../models/stagedPost";
import AuthRequest from "../../types/authRequest";
import { Response } from "express";
import { status } from "../../utilities/enums/statusCode";
import { validateRequiredField } from "../../utilities/helpers/validateField";

export const updateStagedHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    let data: Partial<IStagedPost> = req.body;
    const { id } = req.params;
    const user = req.user;

    if (!data) {
      res
        .status(status.BadRequest)
        .json({ message: "data are required to update staged post" });
      return;
    }

    if (!user) {
      res.status(status.BadRequest).json({ message: "user is required" });
      return;
    }

    validateRequiredField(id, "staged ID", "string");

    const stagedPost = await StagedPost.findById(id);

    if (!stagedPost) {
      res.status(status.NotFound).json({ message: "staged post not found" });
      return;
    }

    const stagedPostAuthor = stagedPost.stagedPostAuthor;

    if (stagedPostAuthor.toString() !== (user?._id as string).toString()) {
      res
        .status(status.AccessDenied)
        .json({ message: "you are not Authorized to update this staged post" });
      return;
    }

    let updateStaged: Partial<IStagedPost> = {
      title: data.title || stagedPost.title,
      content: data.content || stagedPost.content,
      keyTakeAway: data.keyTakeAway || stagedPost.keyTakeAway,
      summary: data.summary || stagedPost.summary,
      postContributor: data.postContributor || stagedPost.postContributor,
      metaDescription: data.metaDescription || stagedPost.metaDescription,
      focusKeywords: data.focusKeywords || stagedPost.focusKeywords,
      categories: data.categories || stagedPost.categories,
      tags: data.tags || stagedPost.tags,
      featuredImage: data.featuredImage || stagedPost.featuredImage,
      coverImage: data.coverImage || stagedPost.coverImage,
      featuredVideo: data.featuredVideo || stagedPost.featuredVideo,
      status: data.status || stagedPost.status,
      ownContent: data.ownContent || stagedPost.ownContent,
      relatedPosts: data.relatedPosts || stagedPost.relatedPosts,
      breadcrumbList: data.breadcrumbList || stagedPost.breadcrumbList,
    };

    // Update the post with new data
    const updatedStaged = await StagedPost.findByIdAndUpdate(id, updateStaged, {
      new: true, // Return the updated document
    }).populate([
      { path: "stagedPostAuthor", select: "username" }, // Populate author field
      { path: "categories", select: "name" }, // Populate categories
      { path: "tags", select: "name" }, // Populate tags
      { path: "relatedPosts", select: "slug" }, // Populate related posts
      { path: "nextPost", select: "slug" }, // Populate next post
      { path: "previousPost", select: "slug" }, // Populate previous post
    ]);

    if (!updatedStaged) {
      res
        .status(status.BadRequest)
        .json({ message: "unable to update stagedPost" });
      return;
    }

    res.status(status.Success).json({
      message: "your staged post updated succesfully",
      stagedpost: updatedStaged,
    });
    return;
  } catch (error: any) {
    console.log("an error occurred", error);
    res
      .status(status.ServerError)
      .json({ message: "Error updating staged post." });
    return;
  }
};
