import { IUser } from "../models/user";
// export interface IUser {
//     id: unknown;
//     username: string;
//     email: string;
//     role: string;
//     password: string;
//   };

export interface JwtPayload extends IUser {
    id: unknown,
    email: string,
    role: string,
}
  
export interface versionLIst {
  version: number;
  versionAuthor?: unknown;
  title: string;
  content: string;
  keyTakeAway?: string;
  summary?: string;
  slug: string;
  parentPost?: unknown;
  permalink: string;
  author: unknown[];
  editor?: unknown[];
  postContributor?: unknown[];
  metaDescription: string;
  focusKeywords: string[];
  coverImage: unknown;
  featuredImage: unknown[];
  featuredVideo: unknown[];
  schemaMarkup: Record<string, unknown>;
  createdAt: Date | number;
}