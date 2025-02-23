
import mongoose, { Document, Schema, Model } from "mongoose";

// Define the User interface extending Mongoose's Document
export interface ITag extends Document {
  name: string;
  createdAt: Date;
}
const tagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 30,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Tag: Model<ITag> = mongoose.model<ITag>('Tag', tagSchema);
export default  Tag;

