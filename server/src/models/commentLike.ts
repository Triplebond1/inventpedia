import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICommentLike extends Document {
    comment: mongoose.Types.ObjectId;
    likeList: {
        user: mongoose.Types.ObjectId;
        status: string;
    }[];
    likeCount: number;
    dislikeCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const commentLikeSchema = new Schema<ICommentLike>(
    {
        comment: { 
            type: Schema.Types.ObjectId, 
            ref: "Comment", 
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
commentLikeSchema.index({ post: 1, "likeList.user": 1 }, { unique: true });

const CommentLike: Model<ICommentLike> = mongoose.model<ICommentLike>("Like", commentLikeSchema);
export default CommentLike;
