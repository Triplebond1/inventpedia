import axios from "axios";
import "dotenv/config";
import { Constants } from "./utilities/constants";
import { postType } from "./utilities/type";

const Url = `${Constants.url}/post`;

const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
};

export const createPost = async (inputData: postType) => {
  const url = `${Url}`;
  try {
    const data = {
      title: inputData.title,
      content: inputData.content,
      keyTakeAway: inputData.keyTakeAway,
      summary: inputData.summary,
    };

    const response = await axios.post(url, data, headers);

    console.log("POST request successful. Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};

export const getPostById = async (postId: string) => {
  const url = `${Url}/${postId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("GET request successful. Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};

export const getAllPost = async (
  permalink: string,
  author: string,
  category: string,
  status: string,
  tag: string,
  startDate: string,
  endDate: string
) => {
  const url = `${process.env.INVENT_NEXUS_API}/posts`;

  try {
    const params = {
      permalink,
      author,
      category,
      status,
      tag,
      startDate,
      endDate,
    };

    const response = await axios.get(url, {
      params, // Axios automatically formats the query parameters
      headers: {
        Accept: "application/json",
      },
    });

    console.log("GET request successful. Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};

export const updatePostStatus = async (postId: string, status: string) => {
  const url = `${process.env.INVENT_NEXUS_API}/post/${postId}`;
  try {
    const data = {
      status,
    };

    const response = await axios.put(url, data, headers);

    console.log("POST request successful. Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};

export const updatePost = async (inputData: postType) => {
  const url = `${process.env.INVENT_NEXUS_API}/posts/${inputData.postId}`;
  try {
    const data = {
      title: inputData.title,
      content: inputData.content,
      keyTakeAway: inputData.keyTakeAway,
      summary: inputData.summary,
      postContributor: inputData.postContributor,
      metaDescription: inputData.metaDescription,
      parentPost: inputData.parentPage,
      focuskeywords: inputData.focuskeywords,
      categories: inputData.categories,
      tags: inputData.tags,
      featuredImage: inputData.featuredImage,
      coverImage: inputData.coverImage,
      postOtherImages: inputData.postOtherImages,
      featuredVideo: inputData.featuredVideo,
      status: inputData.status,
      nextPost: inputData.nextPost,
      previousPost: inputData.previousPost,
      relatedPosts: inputData.relatedPosts,
      breadcrumbList: inputData.breadcrumbList,
    };

    const response = await axios.put(url, data, headers);

    console.log("PUT request successful. Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};

export const deletePost = async (postId: string) => {
  const url = `${process.env.INVENT_NEXUS_API}/posts/${postId}`;
  try {
    const response = await axios.delete(url, headers);

    console.log("DELETE request successful. Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};
