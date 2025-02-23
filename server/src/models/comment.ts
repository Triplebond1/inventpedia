import mongoose, { Document, Schema, Model } from "mongoose";

export interface IComment extends Document {
  post: mongoose.Types.ObjectId;
  commentList: [{
    author: mongoose.Types.ObjectId;
    parentComment?: mongoose.Types.ObjectId | null;
    content: string;
    likes: mongoose.Types.ObjectId[];
    likesCount: number;
    dislikes: mongoose.Types.ObjectId[];
    dislikesCount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }]
  commentCount: number;
}

const commentSchema = new Schema<IComment>(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    commentList: [{
      author: { type: Schema.Types.ObjectId, ref: "User", required: true },
      parentComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
      },
      content: { type: String, required: true, maxlength: 1000 },
      likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
      likesCount: { type: Number, default: 0 },
      dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
      dislikesCount: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    }],
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Comment: Model<IComment> = mongoose.model<IComment>(
  "Comment",
  commentSchema
);
export default Comment;
