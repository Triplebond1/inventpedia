// import mongoose, { Document, Schema, Model } from "mongoose";
// import slugify from "slugify";

// type Image = {
//   imageUrl: string;
//   imageAltText?: string;
//   imageThumbnail?: string;
//   imageWidth?: number;
//   imageHeight?: number;
// };

// type Video = {
//   videoUrl: string;
//   videoAltText?: string;
//   videoThumbnail?: string;
//   imageWidth?: number;
//   imageHeight?: number;
// };

// type Social = {
//   linkedinTitle?: string;
//   linkedinDescription?: string;
//   facebookTitle?: string;
//   facebookDescription?: string;
//   twitterTitle?: string;
//   twitterDescription?: string;
//   ogImage?: string;
// };

// type BreadcrumbItem = {
//   "@type": string;
//   position?: number;
//   name: string;
//   item: string;
// };

// interface IPage extends Document {
//   title: string;
//   metaDescription?: string;
//   content?: string;
//   summary?: string;
//   slug?: string;
//   canonicalUrl?: string;
//   permalink?: string;
//   pageLink?: string;
//   author: mongoose.Types.ObjectId;
//   pageContributor?: mongoose.Types.ObjectId[];
//   parentPage?: mongoose.Types.ObjectId | null;
//   status:
//     | "draft"
//     | "published"
//     | "archived"
//     | "review"
//     | "reviewed"
//     | "rejected";
//   categories?: mongoose.Types.ObjectId[];
//   tags?: mongoose.Types.ObjectId[];
//   coverImage?: Image[];
//   featuredImage?: Image[];
//   postOtherImages?: Image[];
//   featuredVideo?: Video[];
//   schemaMarkup?: Record<string, unknown>;
//   social?: Social;
//   breadcrumbList?: BreadcrumbItem[];
//   relatedPages?: mongoose.Types.ObjectId[];
//   focusKeywords?: string[];
//   nextPage?: mongoose.Types.ObjectId;
//   previousPage?: mongoose.Types.ObjectId;
//   lastModifiedDate?: Date;
//   publishDate?: Date;
// }

// const PageSchema = new Schema<IPage>(
//   {
//     title: { type: String, required: true, trim: true, maxlength: 150 },
//     metaDescription: { type: String, trim: true, maxlength: 160, default: "" },
//     content: { type: String, trim: true },
//     summary: { type: String, trim: true, maxlength: 300 },
//     slug: { type: String, unique: true, lowercase: true, trim: true },
//     canonicalUrl: { type: String, trim: true },
//     permalink: { type: String },
//     pageLink: { type: String },
//     author: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     pageContributor: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     parentPage: { type: Schema.Types.ObjectId, ref: "Page", default: null },
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
//         imageWidth: Number,
//         imageHeight: Number,
//       },
//     ],
//     schemaMarkup: { type: Object, default: {} },
//     social: {
//       linkedinTitle: String,
//       linkedinDescription: String,
//       facebookTitle: String,
//       facebookDescription: String,
//       twitterTitle: String,
//       twitterDescription: String,
//       ogImage: String,
//     },
//     breadcrumbList: [
//       {
//         "@type": { type: String, default: "ListItem" },
//         position: Number,
//         name: String,
//         item: String,
//       },
//     ],
//     relatedPages: [{ type: Schema.Types.ObjectId, ref: "Page" }],
//     focusKeywords: [{ type: String, trim: true }],
//     nextPage: { type: Schema.Types.ObjectId, ref: "Page" },
//     previousPage: { type: Schema.Types.ObjectId, ref: "Page" },
//     lastModifiedDate: { type: Date, default: Date.now },
//     publishDate: { type: Date },
//   },
//   { timestamps: true }
// );

// PageSchema.pre<IPage>("validate", function (next) {
//   if (this.title && !this.slug) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }
//   if (this.slug && !this.permalink) {
//     this.permalink = `${this.slug}`;
//   }
//   if (this.permalink && !this.pageLink) {
//     const baseUrl = process.env.BASE_URL || "https://www.inventnexus.com";
//     this.pageLink = `${baseUrl}/${this.permalink}`;
//   }
//   if (this.permalink && !this.canonicalUrl) {
//     const baseUrl = process.env.BASE_URL || "https://www.inventnexus.com";
//     this.canonicalUrl = `${baseUrl}/${this.permalink}`;
//   }
//   this.schemaMarkup = {
//     "@context": "https://schema.org",
//     "@type": "Article",
//     headline: this.title || "",
//     description: this.metaDescription || "",
//     image: this.coverImage?.[0]?.imageUrl || "",
//     datePublished: this.publishDate || undefined,
//     dateModified: this.lastModifiedDate || new Date(),
//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": this.permalink ? `${process.env.BASE_URL}/${this.permalink}` : "",
//     },
//     breadcrumb: this.breadcrumbList?.map((crumb, index) => ({
//       "@type": "ListItem",
//       position: crumb.position || index + 1,
//       name: crumb.name,
//       item: crumb.item,
//     })),
//   };
//   next();
// });

// const Page: Model<IPage> = mongoose.model<IPage>("Page", PageSchema);
// export default Page;
