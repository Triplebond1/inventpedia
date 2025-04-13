import axios from "axios";
import "dotenv/config";
import { pageType } from "./utilities/type";

const Url = `${process.env.INVENT_NEXUS_API}/page`;

const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
};

export const createPage = async (inputData: pageType) => {
  try {
    const data: pageType = {
      title: inputData.title,
      content: inputData.content,
      keyTakeAway: inputData.keyTakeAway,
      summary: inputData.summary,
      pageContributor: inputData.pageContributor,
      metaDescription: inputData.metaDescription,
      parentPage: inputData.parentPage,
      focuskeywords: inputData.focuskeywords,
      categories: inputData.categories,
      tags: inputData.tags,
      featuredImage: inputData.featuredImage,
      coverImage: inputData.coverImage,
      pageOtherImages: inputData.pageOtherImages,
      featuredVideo: inputData.featuredVideo,
      status: inputData.status,
      nextPage: inputData.nextPage,
      previousPage: inputData.previousPage,
      relatedPages: inputData.relatedPages,
      breadcrumbList: inputData.breadcrumbList,
      social: inputData.social,
    };

    const response = await axios.post(Url, data, headers);

    console.log("POST request successful. Response:", response.data);
    return response.data;
  } catch (error: unknown) {
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

export const getPageById = async (pageId: string) => {
  const url = `${Url}/${pageId}`;
  try {
    const response = await axios.get(url, headers);

    console.log("GET request successful. Response:", response.data);
    return response.data;
  } catch (error: unknown) {
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

export const getAllPage = async () => {
  try {
    const response = await axios.get(Url, headers);

    console.log("GET request successful. Response:", response.data);
    return response.data;
  } catch (error: unknown) {
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

export const updatePageStatus = async (pageId: string, status: string) => {
  const url = `${Url}/${pageId}`;
  const data = { status };
  try {
    const response = await axios.patch(url, data, headers);

    console.log("PATCH request successful. Response:", response.data);
    return response.data;
  } catch (error: unknown) {
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

export const updatePage = async (inputData: pageType) => {
  const url = `${Url}/${inputData.pageId}`;
  const data: pageType = {
    pageId: inputData.pageId,
    title: inputData.title,
    content: inputData.content,
    keyTakeAway: inputData.keyTakeAway,
    summary: inputData.summary,
    pageContributor: inputData.pageContributor,
    metaDescription: inputData.metaDescription,
    parentPage: inputData.parentPage,
    focuskeywords: inputData.focuskeywords,
    categories: inputData.categories,
    tags: inputData.tags,
    featuredImage: inputData.featuredImage,
    coverImage: inputData.coverImage,
    pageOtherImages: inputData.pageOtherImages,
    featuredVideo: inputData.featuredVideo,
    status: inputData.status,
    nextPage: inputData.nextPage,
    previousPage: inputData.previousPage,
    relatedPages: inputData.relatedPages,
    breadcrumbList: inputData.breadcrumbList,
    social: inputData.social,
  };
  try {
    const response = await axios.put(url, data, headers);

    console.log("POST request successful. Response:", response.data);
    return response.data;
  } catch (error: unknown) {
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

export const deletePage = async (pageId: string) => {
  const url = `${Url}/${pageId}`;
  try {
    const response = await axios.delete(url, headers);

    console.log("DELETE request successful. Response:", response.data);
    return response.data;
  } catch (error: unknown) {
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
