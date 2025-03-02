import { IStagedPost, StagedPost } from "../../models/stagedPost";  
import AuthRequest from "../../types/authRequest";
import { Response } from "express";
import { status } from "../../utilities/enums/statusCode";
import { validateRequiredField } from "../../utilities/helpers/validateField";

export const updateStaged = async (req: AuthRequest, res: Response) => {
  try {
    let { data, stagedId }: { data: IStagedPost; stagedId: string } = req.body;
    const user = req.user;

    if (!data) {
      return res
        .status(status.BadRequest)
        .json({ message: "data are required to update staged post" });
    }

    if (!user) {
      return res
        .status(status.BadRequest)
        .json({ message: "user is required" });
    }

    validateRequiredField(stagedId, "staged ID", "string");

    const stagedPost = await StagedPost.findById(stagedId);

    if (!stagedPost) {
      return res
        .status(status.NotFound)
        .json({ message: "staged post not found" });
    }

    const stagedPostAuthor = stagedPost.stagedPostAuthor;

    if (stagedPostAuthor.toString() !== (user?._id as string).toString()) {
      return res
        .status(status.AccessDenied)
        .json({ message: "you are not Authorized to update this staged post" });
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
    const updatedStaged = await StagedPost.findByIdAndUpdate(
      stagedId,
      updateStaged,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation checks
      }
    )
      .populate("author", "username") // Populate author field
      .populate("categories", "name") // Populate categories
      .populate("tags", "name") //populate tags
      .populate("relatedPosts", "postLink")
      .populate("nextPost", "postLink")
      .populate("previousPost", "postLink");

    if (!updatedStaged) {
      return res
        .status(status.BadRequest)
        .json({ message: "unable to update stagedPost" });
    }
    return res
      .status(status.Success)
      .json({ message: "your staged post updated succesfully", updateStaged });
  } catch (error: any) {
    throw error;
  }
};
