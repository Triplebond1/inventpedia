import { Constants } from "./utilities/constants";
import axios from "axios";
const Url = `${Constants.url}/tag`;

const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
};

export const createTag = async (name: string) => {
  const data = { name };
  try {
    const response = await axios.post(Url, data, headers);

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

export const getTagById = async (tagId: string) => {
  const url = `${Url}/${tagId}`;
  try {
    const response = await axios.get(url, headers);

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

export const getAllTag = async () => {
  const url = Url;
  try {
    const response = await axios.get(url, headers);

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

export const updateTag = async (tagId: string, name: string) => {
  const data = { name };
  const url = `${Url}/${tagId}`;
  try {
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

export const daleteTag = async (tagId: string) => {
  const url = `${Url}/${tagId}`;
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
