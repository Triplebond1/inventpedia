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
): Promise<Response> => {
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
      stage,
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
      return res
        .status(resStatus.BadRequest)
        .json({ message: "Invalid status provided." });
    }

    // Fetch the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(resStatus.NotFound)
        .json({ message: "Post not found." });
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
      return res
        .status(resStatus.Unauthorized)
        .json({ message: "You are not authorized to update this post." });
    }

    //if post is our own content and manage by us is shdould be edited by comminuity for consistency.
    if (post.ownContent === true) {
      const allowedRolesForUpdates = ["admin", "editor"];
      const isAuthorizedRole =
        allowedRolesForUpdates.includes(user.role) ||
        post.author.toString() === (user._id as string).toString();

      if (!isAuthorizedRole) {
        return res
          .status(resStatus.Unauthorized)
          .json({ message: "You are not authorized to update this post." });
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
      publishDate: status === "published" ? Date.now() : undefined,
      lastModifiedDate: Date.now(),
      nextPost: nextPost || post.nextPost,
      previousPost: previousPost || post.previousPost,
      relatedPosts: relatedPosts || post.relatedPosts,
      breadcrumbList: breadcrumbList || post.breadcrumbList,
    };

    //authorization check for staging: only admin, editor, and post orignial author update should not be staged
    const stagedData: Partial<IPost> = {
      title: title || undefined,
      content: content || undefined,
      summary: summary || undefined,
      keyTakeAway: keyTakeAway || undefined,
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
      const stagePost = await createStagedPost(user, stagedData as IPost);
      if (!stagePost) {
        res
          .status(resStatus.ServerError)
          .json({ message: "unable to stage post for contribution" });
      }
      return res.status(resStatus.Success).json({
        message: " contribution made succesfully",
      });
    }

    // Authorization check for update: only admin, editor, and post orignial author can update the post
    const allowedRolesForUpdates = ["admin", "editor"];
    const isAuthorizedRole =
      allowedRolesForUpdates.includes(user.role) ||
      post.author.toString() === (user._id as string).toString();

    if (!isAuthorizedRole) {
      return res
        .status(resStatus.Unauthorized)
        .json({ message: "You are not authorized to update this post." });
    }

    //admin, editor and post author specific staging
    if (isAuthorizedRole && stage == true) {
      const createStagePost = await createStagedPostForAdmin(
        user,
        updateData as IPost
      );
      if (!createStagePost) {
        return res
          .status(resStatus.ServerError)
          .json({ message: "unable to create a stage post" });
      }
      return res
        .status(resStatus.Success)
        .json({ message: "create stage successfully" });
    }
    if (updateData) {
      // Check if the post has a version
      const VersionAlreadyExist = await PostVersion.findOne({
        postId: post._id,
      });

      if (!VersionAlreadyExist) {
        const createVersion = await CreatePostVersion(post, user);
        if (!createVersion) {
          return res
            .status(resStatus.ServerError)
            .json({ message: "Error creating post version." });
        }
        updateData.version = {
          versionId: createVersion.id,
          versionIndexList: [
            ...post.version.versionIndexList,
            createVersion.versionList[createVersion.versionList.length - 1]
              .version,
          ],
        };
      }

      const addNewVersion = await createPostNewVersion(
        VersionAlreadyExist as IPostVersion,
        post,
        user
      );

      if (!addNewVersion) {
        return res
          .status(resStatus.ServerError)
          .json({ message: "Error creating new post version." });
      }

      updateData.version = {
        versionIndexList: [
          ...post.version.versionIndexList,
          addNewVersion.versionList[addNewVersion.versionList.length - 1]
            .version,
        ],
      };
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
    return res.status(resStatus.Success).json({
      message: "Post updated successfully.",
      post: updatedPost,
    });
  } catch (error: any) {
    console.error("Error updating post:", error);
    return res
      .status(resStatus.ServerError)
      .json({ message: "Error updating post.", error });
  }
};
