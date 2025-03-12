import mongoose, { Document, Schema, Model } from "mongoose";

// Post versioning schema
export interface IStagedPost extends Document {
  postId: Schema.Types.ObjectId;
  stagedPostAuthor: Schema.Types.ObjectId;
  title: string;
  content: string;
  keyTakeAway?: string;
  summary?: string;
  slug?: string;
  postContributor?: Schema.Types.ObjectId[];
  metaDescription?: string;
  focusKeywords: string[];
  status: string;
  categories?: Schema.Types.ObjectId[];
  tags?: Schema.Types.ObjectId[];
  ownContent: boolean;
  coverImage?: Schema.Types.ObjectId;
  featuredImage?: Schema.Types.ObjectId[];
  featuredVideo?: Schema.Types.ObjectId[];
  schemaMarkup?: Record<string, unknown>;
  social?: Record<string, string>;
  breadcrumbList?: {
    "@type": string;
    position: number;
    name: string;
    item: string;
  }[];
  relatedPosts?: Schema.Types.ObjectId[];
  nextPost?: Schema.Types.ObjectId;
  previousPost?: Schema.Types.ObjectId;
  versionEdited?: number;
}

const stagedPostSchema = new Schema<IStagedPost>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    stagedPostAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    content: { type: String, required: true },
    keyTakeAway: { type: String, trim: true, maxlength: 200 },
    summary: { type: String, trim: true, maxlength: 300 },
    slug: { type: String, lowercase: true, trim: true },
    postContributor: [{ type: Schema.Types.ObjectId, ref: "User" }],
    metaDescription: { type: String, trim: true, maxlength: 160 },
    focusKeywords: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: [
        "draft",
        "merged",
        "review",
        "reviewed",
        "rejected",
      ],
      default: "draft",
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    coverImage: {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },

    featuredImage: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    featuredVideo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    schemaMarkup: { type: Object, default: {} },
    social: { type: Object, default: {} },
    breadcrumbList: [
      { "@type": String, position: Number, name: String, item: String },
    ],
    relatedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    nextPost: { type: Schema.Types.ObjectId, ref: "Post" },
    previousPost: { type: Schema.Types.ObjectId, ref: "Post" },
    ownContent: {type: Boolean, dafault: false},
    versionEdited: { type: Number },
  },

  { timestamps: true }
);

const StagedPost: Model<IStagedPost> = mongoose.model<IStagedPost>(
  "StagedPost",
  stagedPostSchema
);
export { StagedPost };
