// import mongoose, { Document, Schema, Model } from "mongoose";

// interface IComment extends Document {
//   post: mongoose.Types.ObjectId;
//   author: mongoose.Types.ObjectId;
//   parentComment?: mongoose.Types.ObjectId | null;
//   content: string;
//   likes: mongoose.Types.ObjectId[];
//   likesCount: number;
//   dislikes: mongoose.Types.ObjectId[];
//   dislikesCount: number;
//   status: "pending" | "approved" | "rejected";
//   createdAt: Date;
//   updatedAt: Date;
// }

// const commentSchema = new Schema<IComment>(
//   {
//     post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
//     author: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     parentComment: {
//       type: Schema.Types.ObjectId,
//       ref: "Comment",
//       default: null,
//     },
//     content: { type: String, required: true, maxlength: 1000 },
//     likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     likesCount: { type: Number, default: 0 },
//     dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     dislikesCount: { type: Number, default: 0 },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// const Comment: Model<IComment> = mongoose.model<IComment>(
//   "Comment",
//   commentSchema
// );
// export default Comment;
