import Post from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";
import { IPost } from "../../../models/post";
import { IPostVersion, PostVersion } from "../../../models/postVersioning";
import {
  createPostNewVersion,
  CreatePostVersion,
} from "../../../service/postVersion/createPostVersion";
import {
  createStagedPost,
  createStagedPostForAdmin,
} from "../../../service/stagedPost/createStaged";

const resStatus = status;

// @desc    Update an existing post
// @route   PUT /v1/api/post/:id
// @access  Private (Admin, editor, author and contributor)
export const updatePostHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.user;
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
      coverImage,
      featuredVideo,
      status,
      stagedStatus,
      stage,
      nextPost,
      previousPost,
      relatedPosts,
      breadcrumbList,
    } = req.body;
    if (!user) {
      res
        .status(resStatus.Unauthorized)
        .json({ message: "User is not authenticated" });
      return;
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
      res
        .status(resStatus.BadRequest)
        .json({ message: "Invalid status provided." });
      return;
    }

    // Fetch the post by ID
    const post = await Post.findById(id);
    if (!post) {
      res.status(resStatus.NotFound).json({ message: "Post not found." });
      return;
    }

    // Authorization check: only admin, editor, author, or contributor can update the post
    const allowedRoles = [
      "admin",
      "author",
      "contributor",
      "editor",
      "moderator",
      "reviewer",
      "subscriber",
    ];
    const isAuthorized = allowedRoles.includes(user.role);

    if (!isAuthorized) {
      res
        .status(resStatus.Unauthorized)
        .json({ message: "You are not authorized to update this post." });
      return;
    }

    //if post is our own content and manage by us is shdould be edited by comminuity for consistency.
    if (post.ownContent === true) {
      const allowedRolesForUpdates = ["admin", "editor"];
      const isAuthorizedRole =
        allowedRolesForUpdates.includes(user.role) ||
        post.author.toString() === (user._id as string).toString();

      if (!isAuthorizedRole) {
        res
          .status(resStatus.Unauthorized)
          .json({ message: "You are not authorized to update this post." });
        return;
      }
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
    let updateData: Partial<IPost> = {
      title: title || post.title,
      content: content || post.content,
      slug: slug || post.slug,
      keyTakeAway: keyTakeAway || post.keyTakeAway,
      summary: summary || post.summary,
      postContributor: postContributor || post.postContributor,
      metaDescription: metaDescription || post.metaDescription,
      focusKeywords: focusKeywords || post.focusKeywords,
      parentPost: parentPost || post.parentPost,
      categories: categories || post.categories,
      tags: tags || post.tags,
      featuredImage: featuredImage || post.featuredImage,
      coverImage: coverImage || post.coverImage,
      featuredVideo: featuredVideo || post.featuredVideo,
      status: status,
      publishDate: status === "published" ? new Date(): undefined,
      lastModifiedDate: new Date(),
      nextPost: nextPost || post.nextPost,
      previousPost: previousPost || post.previousPost,
      relatedPosts: relatedPosts || post.relatedPosts,
      breadcrumbList: breadcrumbList || post.breadcrumbList,
    };

    //authorization check for staging: only admin, editor, and post orignial author update should not be staged
    // unless they specify they want to stage their edit
    const stagedData: Partial<IPost> = {
      _id: post._id,
      version: post.version,
    };
    const allowedRolesForStaging = [
      "author",
      "contributor",
      "moderator",
      "reviewer",
      "subscriber",
    ];
    const isAuthorizedForStaging = allowedRolesForStaging.includes(user.role);
    if (
      isAuthorizedForStaging &&
      !(post.author.toString() === (user._id as string).toString())
    ) {
      const stagePost = await createStagedPost(user, stagedData as IPost, updateData as IPost, stagedStatus as string);
      if (!stagePost) {
        res
          .status(resStatus.ServerError)
          .json({ message: "unable to stage post for contribution" });
        return;
      }
      res.status(resStatus.Success).json({
        message: " contribution made succesfully",
        stagedPost: stagePost,
      });
      return;
    }

    // Authorization check for update: only admin, editor, and post orignial author can update the post
    const allowedRolesForUpdates = ["admin", "editor"];
    const isAuthorizedRole =
      allowedRolesForUpdates.includes(user.role) ||
      post.author.toString() === (user._id as string).toString();

    if (!isAuthorizedRole) {
      res
        .status(resStatus.Unauthorized)
        .json({ message: "You are not authorized to update this post." });
      return;
    }

    //admin, editor and post author specific staging
    if (isAuthorizedRole && stage == true) {
      const createStagePost = await createStagedPostForAdmin(
        user,
        stagedData as IPost,
        updateData as IPost,
      );
      if (!createStagePost) {
        res
          .status(resStatus.ServerError)
          .json({ message: "unable to create a stage post" });
        return;
      }
      res
        .status(resStatus.Success)
        .json({ message: "create stage successfully" });
      return;
    }

    if (updateData) {
      // Check if the post has a version
      const versionAlreadyExist = await PostVersion.findOne({
        postId: post._id,
      });

      if (versionAlreadyExist) {
        const addNewVersion = await createPostNewVersion(
          versionAlreadyExist as IPostVersion,
          post,
          user
        );

        if (!addNewVersion) {
          res
            .status(resStatus.ServerError)
            .json({ message: "Error creating new post version." });
          return;
        }

        updateData.version = {
          versionIndexList: [
            ...post.version.versionIndexList,
            addNewVersion.versionList[addNewVersion.versionList.length - 1]
              .version + 1,
          ],
        };
      }

      if (!versionAlreadyExist) {
        const createVersion = await CreatePostVersion(post, user);
        if (!createVersion) {
          res
            .status(resStatus.ServerError)
            .json({ message: "Error creating post version." });
          return;
        }
        updateData.version = {
          versionId: createVersion.id,
          versionIndexList: [
            ...post.version.versionIndexList,
            createVersion.versionList[createVersion.versionList.length - 1]
              .version + 1,
          ],
        };
      }
    }

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
    res.status(resStatus.Success).json({
      message: "Post updated successfully.",
      post: updatedPost,
    });
    return;
  } catch (error: any) {
    console.error("Error updating post:", error);
    res
      .status(resStatus.ServerError)
      .json({ message: "Error updating post."});
    return;
  }
};
