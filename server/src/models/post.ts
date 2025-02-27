import mongoose, { Document, Schema, Model } from "mongoose";
import slugify from "slugify";


export interface IPost extends Document {
  title: string;
  content: string;
  keyTakeAway?: string;
  summary?: string;
  slug: string;
  parentPost?: Schema.Types.ObjectId;
  permalink: string;
  author: Schema.Types.ObjectId[];
  editor?: Schema.Types.ObjectId[];
  postContributor?: Schema.Types.ObjectId[];
  metaDescription: string;
  focusKeywords: string[];
  status: string;
  categories: Schema.Types.ObjectId[];
  tags: Schema.Types.ObjectId[];
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  views: number;
  ownContent: boolean;
  stage: boolean
  coverImage: Schema.Types.ObjectId;
  featuredImage: Schema.Types.ObjectId[];
  featuredVideo: Schema.Types.ObjectId[];
  schemaMarkup: Record<string, unknown>;
  social: Record<string, string>;
  breadcrumbList: {
    "@type": string;
    position: number;
    name: string;
    item: string;
  }[];
  relatedPosts: Schema.Types.ObjectId[];
  nextPost?: Schema.Types.ObjectId;
  previousPost?: Schema.Types.ObjectId;
  readTime: number;
  version: {
    versionId?: Schema.Types.ObjectId;
    versionIndexList: number[];
  };
  lastModifiedDate: Date | number;
  publishDate?: Date | number;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    content: { type: String, required: true },
    keyTakeAway: { type: String, trim: true, maxlength: 200 },
    summary: { type: String, trim: true, maxlength: 300 },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    parentPost: { type: Schema.Types.ObjectId, ref: "Post", default: null },
    permalink: { type: String, unique: true, lowercase: true, trim: true },
    author: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    editor: [{ type: Schema.Types.ObjectId, ref: "User" }],
    postContributor: [{ type: Schema.Types.ObjectId, ref: "User" }],
    metaDescription: { type: String, trim: true, maxlength: 160 },
    focusKeywords: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "archived",
        "review",
        "reviewed",
        "rejected",
      ],
      default: "draft",
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
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
    relatedPosts: [{ type: Schema.Types.ObjectId, ref: "Page" }],
    nextPost: { type: Schema.Types.ObjectId, ref: "Page" },
    previousPost: { type: Schema.Types.ObjectId, ref: "Page" },
    readTime: { type: Number },
    version: {
      versionId: { type: Schema.Types.ObjectId, ref: "PostVersion" },
      versionIndexList: [{ type: Number }],
    },
    ownContent: {type: Boolean, dafault: false},
    views: { type: Number, default: 0 },
    lastModifiedDate: { type: Number },
    publishDate: { type: Number },
  },
  { timestamps: true }
);

postSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.slug && !this.permalink) {
    const baseUrl = process.env.BASE_URL || "https://www.inventnexus.com";
    this.permalink = `${baseUrl}/${this.slug}`;
  }
  if (this.content && !this.readTime) {
    const words = this.content.split(" ").length;
    this.readTime = Math.ceil(words / 200);
  }
  this.schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: this.title || "",
    description: this.metaDescription || "",
    publisher: {
      "@type": "Organization",
      name: "InventPedia",
      logo: {
        "@type": "ImageObject",
        url: "https://www.inventnexus.com/logo.png",
      },
    },
    datePublished: this.publishDate || undefined,
    dateModified: this.lastModifiedDate || new Date(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": this.slug ? `${process.env.BASE_URL}/${this.slug}` : "",
    },
    breadcrumb: this.breadcrumbList.map((crumb, index) => ({
      "@type": "ListItem",
      position: crumb.position || index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
  next();
});

const Post: Model<IPost> = mongoose.model("Post", postSchema);
export default Post;
