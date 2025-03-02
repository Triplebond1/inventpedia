import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPostComment extends Document {
  postId: mongoose.Types.ObjectId;
  commentList: IComment[];
  commentCount: number;
}

export interface IComment {
  author: mongoose.Types.ObjectId;
  parentCommentId?: mongoose.Types.ObjectId | null;
  content: string;
  likes?: mongoose.Types.ObjectId[];
  status: string;
  createdAt?: Date | number;
  updatedAt?: Date | number;
}

const commentSchema = new Schema<IComment>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    content: { type: String, required: true, maxlength: 1000 },
    likes: [{ type: Schema.Types.ObjectId, ref: "CommentLike" }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { _id: true,  timestamps: true}
);

const postCommentSchema = new Schema<IPostComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    commentList: [commentSchema],
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PostComment: Model<IPostComment> = mongoose.model<IPostComment>(
  "PostComment",
  postCommentSchema
);
export default PostComment;
