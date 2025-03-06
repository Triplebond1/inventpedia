import mongoose, { Document, Schema, Model } from "mongoose";

interface IImage extends Document {
  fileName: string;
  originalName: string;
  url: string;
  altText?: string;
  title?: string;
  description?: string;
  size: number;
  format: string;
  width?: number;
  height?: number;
  thumbnailUrl?: string;
  uploadedBy: mongoose.Types.ObjectId;
  keywords?: string[];
  createdAt?: Date;
}

const imageSchema = new Schema<IImage>(
  {
    fileName: { type: String, required: true, trim: true, maxlength: 200 },
    originalName: { type: String, required: true, trim: true, maxlength: 200 },
    url: { type: String, required: true, trim: true },
    altText: { type: String, trim: true, maxlength: 150 },
    title: { type: String, trim: true, maxlength: 100, default:null },
    description: { type: String, trim: true, maxlength: 500, default:null},
    size: { type: Number, required: true },
    format: { type: String, required: true },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    thumbnailUrl: { type: String, trim: true, default:null },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    keywords: [{ type: String, trim: true, lowercase: true }],
  },
  {
    timestamps: true,
  }
);

const Image: Model<IImage> = mongoose.model<IImage>("Image", imageSchema);
export default Image;
