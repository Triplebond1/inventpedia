import { PostVersion } from "../../../../models/postVersioning";
import { IUser } from "../../../../models/user";
import { IPost } from "../../../../models/post";
import { IPostVersion } from "../../../../models/postVersioning";
import { versionLIst } from "../../../../types/interface";

export const CreatePostVersion = async (
  data: IPost,
  userId: IUser
): Promise<IPostVersion> => {
  try {
    if (!data) {
      throw new Error("Data is required to create a post version");
    }
    const version = new PostVersion({
      postId: data._id,
      versionList: [
        {
          version: data.version.versionIndexList.length + 1,
          versionAuthor: userId._id,
          title: data.title,
          content: data.content,
          schemaMarkup: data.schemaMarkup,
          coverImage: data.coverImage,
          keyTakeAway: data.keyTakeAway,
          summary: data.summary,
          slug: data.slug,
          parentPost: data.parentPost,
          permalink: data.permalink,
          postContributor: data.postContributor,
          metaDescription: data.metaDescription,
          focusKeywords: data.focusKeywords,
          featuredImage: data.featuredImage,
          featuredVideo: data.featuredVideo,
        },
      ],
    });
    return version.save();
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const createPostNewVersion = async (
  prevVersion: IPostVersion,
  data: IPost,
  userId: IUser
): Promise<IPostVersion> => {
  try {
    if (!data || !prevVersion) {
      throw new Error(
        "Data and previous version are required to create a new post version"
      );
    }

    const lastVersion =
      prevVersion.versionList[prevVersion.versionList.length - 1];

    const newVersion: versionLIst = {
      version: lastVersion.version + 1,
      versionAuthor: userId._id,
      title: data.title || lastVersion.title,
      content: data.content || lastVersion.content,
      keyTakeAway: data.keyTakeAway || lastVersion.keyTakeAway,
      summary: data.summary || lastVersion.summary,
      slug: data.slug || lastVersion.slug,
      author: data.author || lastVersion.author,
      editor: data.editor || lastVersion.editor,
      parentPost: data.parentPost || lastVersion.parentPost,
      permalink: data.permalink || lastVersion.permalink,
      postContributor: data.postContributor || lastVersion.postContributor,
      metaDescription: data.metaDescription || lastVersion.metaDescription,
      focusKeywords: data.focusKeywords || lastVersion.focusKeywords,
      coverImage: data.coverImage || lastVersion.coverImage,
      featuredImage: data.featuredImage || lastVersion.featuredImage,
      featuredVideo: data.featuredVideo || lastVersion.featuredVideo,
      schemaMarkup: data.schemaMarkup || lastVersion.schemaMarkup,
      createdAt: Date.now(),
    };

    prevVersion.versionList.push(newVersion as typeof lastVersion);

    // Automatically remove the oldest version if version list exceeds 10
    if (prevVersion.versionList.length > 10) {
      prevVersion.versionList.shift();
    }

    return prevVersion.save();
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};
