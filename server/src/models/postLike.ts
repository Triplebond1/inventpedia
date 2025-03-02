import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPostLike extends Document {
    post: mongoose.Types.ObjectId;
    likeList: {
        user: mongoose.Types.ObjectId;
        status: string;
    }[];
    likeCount: number;
    dislikeCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const postLikeSchema = new Schema<IPostLike>(
    {
        post: { 
            type: Schema.Types.ObjectId, 
            ref: "Post", 
            required: true,
            index: true // Index for faster queries
        },
        likeList: [
            {
                user: { 
                    type: Schema.Types.ObjectId, 
                    ref: "User", 
                    required: true,
                    index: true // Index for faster user-based lookups
                },
                status: {
                    type: String,
                    enum: ["like", "dislike"],
                    default: "like",
                    required: true
                }
            }
        ],
        likeCount: { type: Number, default: 0 },
        dislikeCount: { type: Number, default: 0 }
    },
    { timestamps: true }
);

// Ensure a user can only like/dislike a post once
postLikeSchema.index({ post: 1, "likeList.user": 1 }, { unique: true });

const PostLike: Model<IPostLike> = mongoose.model<IPostLike>("Like", postLikeSchema);
export default PostLike;
