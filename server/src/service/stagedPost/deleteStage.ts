import { StagedPost } from "../../models/stagedPost";
import { IUser } from "../../models/user";
import { validateRequiredField } from "../../utilities/helpers/validateField";



export const deleteStaged = async (stagedId: string, user:IUser) => {
    validateRequiredField(stagedId, "staged post ID", "string")
    if (!user) {
        throw new Error("user is required")
    }

    const stagedPost = await StagedPost.findById(stagedId);

    if (!stagedPost) {
        throw new Error ("staged post not found")
    }
    const allowedRoles = ["admin", "editor",] 

    if (stagedPost.stagedPostAuthor.toString() !== (user?._id as string).toString() && !allowedRoles.includes(user.role)) {
        throw new Error ("you are not authorized to delte post")
    }

    stagedPost.deleteOne()
}