import { IStagedPost, StagedPost } from "../../models/stagedPost";
import AuthRequest from "../../types/authRequest";
import { Response } from "express";
import { status } from "../../utilities/enums/statusCode";
import { validateRequiredField } from "../../utilities/helpers/validateField";

export const updateStaged = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    let { data, stagedId }: { data: IStagedPost; stagedId: string } = req.body;
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

    validateRequiredField(stagedId, "staged ID", "string");

    const stagedPost = await StagedPost.findById(stagedId)
      .populate("author", "username") // Populate author field
      .populate("categories", "name") // Populate categories
      .populate("tags", "name") //populate tags
      .populate("relatedPosts", "postLink")
      .populate("nextPost", "postLink")
      .populate("previousPost", "postLink");

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

    stagedPost.title = data.title || stagedPost.title;
    stagedPost.content = data.content || stagedPost.content;
    stagedPost.keyTakeAway = data.keyTakeAway || stagedPost.keyTakeAway;
    stagedPost.summary = data.summary || stagedPost.summary;
    stagedPost.postContributor =
      data.postContributor || stagedPost.postContributor;
    stagedPost.metaDescription =
      data.metaDescription || stagedPost.metaDescription;
    stagedPost.focusKeywords = data.focusKeywords || stagedPost.focusKeywords;
    stagedPost.categories = data.categories || stagedPost.categories;
    stagedPost.tags = data.tags || stagedPost.tags;
    stagedPost.featuredImage = data.featuredImage || stagedPost.featuredImage;
    stagedPost.coverImage = data.coverImage || stagedPost.coverImage;
    stagedPost.featuredVideo = data.featuredVideo || stagedPost.featuredVideo;
    stagedPost.status = data.status || stagedPost.status;
    stagedPost.ownContent = data.ownContent || stagedPost.ownContent;
    stagedPost.relatedPosts = data.relatedPosts || stagedPost.relatedPosts;
    stagedPost.breadcrumbList =
      data.breadcrumbList || stagedPost.breadcrumbList;

    // Update the post with new data
    const updatedStaged = stagedPost.save();

    if (!updatedStaged) {
      res
        .status(status.BadRequest)
        .json({ message: "unable to update stagedPost" });
      return;
    }
    res
      .status(status.Success)
      .json({ message: "your staged post updated succesfully", updateStaged });
    return;
  } catch (error: any) {
    throw error;
  }
};
