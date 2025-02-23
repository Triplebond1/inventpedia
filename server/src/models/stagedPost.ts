import mongoose, { Document, Schema, Model } from "mongoose";

// Post versioning schema
interface IStagedPost extends Document  {
  postId: Schema.Types.ObjectId;
    stagedPostAuthor: Schema.Types.ObjectId;
    title: string;
    content: string;
    keyTakeAway?: string;
    summary?: string;
    slug: string;
    parentPost?: Schema.Types.ObjectId;
    permalink: string;
    author: Schema.Types.ObjectId;
    editor?: Schema.Types.ObjectId;
    postContributor?: Schema.Types.ObjectId[];
    metaDescription: string;
    focusKeywords: string[];
    version: Schema.Types.ObjectId;
    coverImage: Schema.Types.ObjectId;
    featuredImage: Schema.Types.ObjectId[];
    featuredVideo: Schema.Types.ObjectId[];
    schemaMarkup: Record<string, unknown>;
    createdAt: Date;
}

const stagedPostSchema = new Schema<IStagedPost>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true, index: true  },

    stagedPostAuthor: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        title: { type: String, required : true, trim: true, maxlength: 150 },
        content: { type: String, required: true },
        keyTakeAway: { type: String, trim: true, maxlength: 200 },
        summary: { type: String, trim: true, maxlength: 300 },
        slug: { type: String, unique: true, lowercase: true, trim: true },
        parentPost: { type: Schema.Types.ObjectId, ref: "Post", default: null },
        permalink: { type: String, unique: true, lowercase: true, trim: true },
        postContributor: [{ type: Schema.Types.ObjectId, ref: "User" }],
        metaDescription: { type: String, trim: true, maxlength: 160 },
        focusKeywords: [{ type: String, trim: true }],
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
        version: { type: Schema.Types.ObjectId, ref: "PostVersion" },
        createdAt: { type: Date, default: Date.now },
      },

  { timestamps: true }
);

// Pre-save hook to auto-increment version number
// stagedPostSchema.pre("save", function (next) {
//   if (this.isModified("versionList")) {
//     const latestVersion =
//       this.versionList.length > 0
//         ? this.versionList[this.versionList.length - 1].version
//         : 0;
//     this.versionList[this.versionList.length - 1].version = latestVersion + 1;

//     // If version count exceeds 10, remove the oldest version
//     if (this.versionList.length > 10) {
//       this.versionList.shift();
//     }
//   }
//   next();
// });

const PostVersion: Model<IStagedPost> = mongoose.model<IStagedPost>(
  "PostVersion",
  stagedPostSchema
);
export { PostVersion };
