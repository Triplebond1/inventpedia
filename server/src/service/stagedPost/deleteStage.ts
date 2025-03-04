import { StagedPost } from "../../models/stagedPost";
import { IUser } from "../../models/user";
import { validateRequiredField } from "../../utilities/helpers/validateField";

export const deleteStaged = async (stagedId: string, user: IUser) => {
  try {
    validateRequiredField(stagedId, "staged post ID", "string");
    if (!user) {
      throw new Error("user is required");
    }

    const stagedPost = await StagedPost.findById(stagedId);

    if (!stagedPost) {
      throw new Error("staged post not found");
    }
    const allowedRoles = ["admin", "editor"];

    if (
      stagedPost.stagedPostAuthor.toString() !==
        (user?._id as string).toString() &&
      !allowedRoles.includes(user.role)
    ) {
      throw new Error("you are not authorized to delte post");
    }

    const deleted = stagedPost.deleteOne();

    if (!deleted) {
      throw new Error("unable to delete staged post");
    }
    return true;
  } catch (error) {
    console.log("an error ocurred while deleting staged post", error);
    throw error;
  }
};
