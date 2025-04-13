import "dotenv/config";
import axios from "axios";
import FormData from "form-data";

const Url = `${process.env.INVENT_NEXUS_API}/images`;

const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
};

export const uploadImage = async (
  file: File,
  altText: string,
  title: string,
  description: string,
  keywords: string
) => {
  if (!file) return { success: false, message: "File is required" };

  const url = `${Url}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("altText", altText);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("keywords", keywords);

  try {
    const response = await axios.post(url, formData, headers);
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: "Failed to upload image" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};

export const getImage = async (imageId: string) => {
  if (!imageId) {
    return { success: false, message: "Image ID is required" };
  }

  const url = `${Url}/${imageId}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: "Failed to retrieve image" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "An unexpected error occurred.",
      };
    }
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};

export const getAllImage = async () => {
  const url = `${Url}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: "Failed to retrieve images" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};

export const updateImage = async (
  imageId: string,
  title: string,
  description: string,
  altText: string,
  keywords: string
) => {
  if (!imageId) return { success: false, message: "Image ID is required" };

  const url = `${Url}/${imageId}`;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("altText", altText);
  formData.append("keywords", keywords);

  try {
    const response = await axios.put(url, formData, headers);
    return response.status === 200
      ? { success: true, data: response.data }
      : { success: false, message: "Failed to update image" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};

export const deleteImage = async (ImageId: string) => {
  if (!ImageId) return { success: false, message: "Image ID is required" };

  const url = `${Url}/${ImageId}`;

  try {
    const response = await axios.delete(url, headers);
    return response.status === 200
      ? { success: true, message: "Image deleted successfully" }
      : { success: false, message: "Failed to delete image" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login Error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "An unexpected error occurred.",
      };
    }

    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};
