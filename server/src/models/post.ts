// import mongoose, { Document, Schema, Model } from "mongoose";
// import slugify from "slugify";


// type ImageType = {
//   imageUrl: string,
//   imageAltText: string,
//   imageThumbnail: string,
//   imageWidth: number,
//   imageHeight: number,
// };

// type VideoType = {
//   videoUrl: string,
//   videoAltText: string,
//   videoThumbnail: string,
//   videoWidth: number,
//   videoHeight: number,
// };

// interface IPost extends Document {
//   title: string;
//   content: string;
//   keyTakeAway?: string;
//   summary?: string;
//   slug: string;
//   parentPost?: Schema.Types.ObjectId;
//   permalink: string;
//   postLink: string;
//   author: Schema.Types.ObjectId;
//   postContributor: Schema.Types.ObjectId[];
//   metaDescription: string;
//   focusKeywords: string[];
//   status:
//     | "draft"
//     | "published"
//     | "archived"
//     | "review"
//     | "reviewed"
//   | "rejected";
  
//   categories: Schema.Types.ObjectId[];
//   tags: Schema.Types.ObjectId[];
//   likes: Schema.Types.ObjectId[];
//   likesCount: number;
//   dislikesCount: number;
//   comments: Schema.Types.ObjectId[];
//   commentsCount: number;
//   coverImage: ImageType[];
//   featuredImage: ImageType[];
//   postOtherImages: ImageType[];
//   featuredVideo: VideoType[];
//   schemaMarkup: Record<string, unknown>;
//   social: Record<string, string>;
//   breadcrumbList: {
//     "@type": string,
//     position: number,
//     name: string,
//     item: string,
//   }[];
//   relatedPosts: Schema.Types.ObjectId[];
//   nextPost?: Schema.Types.ObjectId;
//   previousPost?: Schema.Types.ObjectId;
//   readTime: number;
//   lastModifiedDate: Date;
//   publishDate?: Date;
// }

// const postSchema = new Schema<IPost>({

//     title: { type: String, required: true, trim: true, maxlength: 150 },
//     content: { type: String, required: true },
//     keyTakeAway: { type: String, trim: true, maxlength: 200 },
//     summary: { type: String, trim: true, maxlength: 300 },
//     slug: { type: String, unique: true, lowercase: true, trim: true },
//     parentPost: { type: Schema.Types.ObjectId, ref: "Post", default: null },
//     permalink: { type: String },
//     postLink: { type: String },
//     author: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     postContributor: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     metaDescription: { type: String, trim: true, maxlength: 160 },
//     focusKeywords: [{ type: String, trim: true }],
//     status: {
//       type: String,
//       enum: [
//         "draft",
//         "published",
//         "archived",
//         "review",
//         "reviewed",
//         "rejected",
//       ],
//       default: "draft",
//     },
//     categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
//     tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
//     likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     likesCount: { type: Number, default: 0 },
//     dislikesCount: { type: Number, default: 0 },
//     comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
//     commentsCount: { type: Number, default: 0 },
//     coverImage: [
//       {
//         imageUrl: String,
//         imageAltText: String,
//         imageThumbnail: String,
//         imageWidth: Number,
//         imageHeight: Number,
//       },
//     ],
//     featuredImage: [
//       {
//         imageUrl: String,
//         imageAltText: String,
//         imageThumbnail: String,
//         imageWidth: Number,
//         imageHeight: Number,
//       },
//     ],
//     postOtherImages: [
//       {
//         imageUrl: String,
//         imageAltText: String,
//         imageThumbnail: String,
//         imageWidth: Number,
//         imageHeight: Number,
//       },
//     ],
//     featuredVideo: [
//       {
//         videoUrl: String,
//         videoAltText: String,
//         videoThumbnail: String,
//         videoWidth: Number,
//         videoHeight: Number,
//       },
//     ],
//     schemaMarkup: { type: Object, default: {} },
//     social: { type: Object, default: {} },
//     breadcrumbList: [
//       { "@type": String, position: Number, name: String, item: String },
//     ],
//     relatedPosts: [{ type: Schema.Types.ObjectId, ref: "Page" }],
//     nextPost: { type: Schema.Types.ObjectId, ref: "Page" },
//   previousPost: { type: Schema.Types.ObjectId, ref: "Page" },
//     readTime: { type: Number },
//     lastModifiedDate: { type: Date },
//     publishDate: { type: Date },
//   },
//   { timestamps: true });

// postSchema.pre("validate", function (next) {
//   if (this.title && !this.slug) {
//     this.slug = slugify.default(this.title, { lower: true, strict: true });
//   }
//   if (this.slug && !this.permalink) {
//     this.permalink = `${this.slug}`;
//   }
//   if (this.permalink && !this.postLink) {
//     const baseUrl = process.env.BASE_URL || "https://www.inventnexus.com";
//     this.postLink = `${baseUrl}/${this.permalink}`;
//   }
//   if (this.content && !this.readTime) {
//     const words = this.content.split(" ").length;
//     this.readTime = Math.ceil(words / 200);
//   }
//   this.schemaMarkup = {
//     "@context": "https://schema.org",
//     "@type": "Article",
//     headline: this.title || "",
//     description: this.metaDescription || "",
//     image: this.coverImage.length > 0 ? this.coverImage[0].imageUrl : "",
//     datePublished: this.publishDate || undefined,
//     dateModified: this.lastModifiedDate || new Date(),
//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": this.permalink ? `${process.env.BASE_URL}/${this.permalink}` : "",
//     },
//     breadcrumb: this.breadcrumbList.map((crumb, index) => ({
//       "@type": "ListItem",
//       position: crumb.position || index + 1,
//       name: crumb.name,
//       item: crumb.item,
//     })),
//   };
//   next();
// });

// const Post: Model<IPost> = mongoose.model("Post", postSchema);
// export default Post;
