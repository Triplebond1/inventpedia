import { IStagedPost, StagedPost } from "../../models/stagedPost";
import { validateRequiredField } from "../../utilities/helpers/validateField";

export const getStageHandler = async(stagedId: string): Promise<IStagedPost> => {
    try {

        validateRequiredField(stagedId, "staged post ID", "string");
        
    const staged = await StagedPost.findById(stagedId) as IStagedPost;
    return staged;
  } catch (error: any) {
    throw error;
  }
};
