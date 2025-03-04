import Post from "../../../models/post";
import AuthRequest from "../../../types/authRequest";
import { Response } from "express";
import { status } from "../../../utilities/enums/statusCode";
import { validateField } from "../../../utilities/helpers/validateField";

const resStatus = status;

interface PostQueryParams {
  permalink?: string;
  author?: string;
  category?: string;
  status?: string;
  tag?: string;
  startDate?: number;
  endDate?: number;
}
// @desc    Get all posts (with optional filtering by category, tag, date range)
// @route   GET /v1/api/post
// @access  Public
export const getAllPostsHandler = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      permalink,
      author,
      category,
      status,
      tag,
      startDate,
      endDate,
    }: PostQueryParams = req.query;

    validateField(permalink, "Permalink", "string");
    validateField(author, "Author", "string");
    validateField(category, "Category", "string");
    validateField(status, "Status", "string");
    validateField(tag, "Tag", "string");
    validateField(startDate, "Start Date", "number");
    validateField(endDate, "End Date", "number");

    // Build query object dynamically
    const query: any = {};

    if (status) query.status = status;
    if (permalink) query.permalink = permalink;
    if (author) query.author = author;
    if (category) query.categories = category;
    if (tag) query.tags = tag;

    // Filter by specific day or date range
    if (startDate || endDate) {
      const start = new Date(startDate as number);
      const end = endDate
        ? new Date(endDate as number)
        : new Date(startDate as number);
      query.publishDate = {
        $gte: start,
        $lte: end,
      };
    }

    // Fetch posts with the applied filters
    const posts = await Post.find(query)
      .populate("author", "name")
      .populate("categories", "name")
      .populate("tags", "name");

    if (!posts.length) {
      res.status(resStatus.NotFound).json({ message: "No posts found" });
      return;
    }

    res.status(resStatus.Success).json(posts);
    return;
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    res
      .status(resStatus.ServerError)
      .json({ message: "Error fetching posts", error });
    return;
  }
};
