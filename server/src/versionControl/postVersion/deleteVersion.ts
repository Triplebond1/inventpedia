import { PostVersion } from "../../models/postVersioning";
import { validateRequiredField } from "../../utilities/helpers/validateField";

export const deleteVersion = async (
  userId: string,
  postId: string,
  versionId: number
) => {
  try {
    validateRequiredField(userId, "User ID", "string");
    validateRequiredField(postId, "Post ID", "string");
    validateRequiredField(versionId, "Version Index", "number");

    const version = await PostVersion.findOne({ postId: postId });
    if (!version) {
      throw new Error("Post version not found");
    }

    const versionIndex = version.versionList.findIndex(
      (e) => e.version === versionId
    );
    if (versionIndex === -1) {
      throw new Error("Version index not found");
    }
    const [deletedVersion] = version.versionList.splice(versionIndex, 1);

    if (!deletedVersion) {
      throw new Error("Failed to delete version");
    }
    await version.save();

    return deletedVersion;
  } catch (error: any) {
    console.error("Error deleting post version:", error);
    throw error;
  }
};
