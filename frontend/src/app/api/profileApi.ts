import { Constants } from "./utilities/constants";
import axios from "axios";
import { profileType } from "./utilities/type";

const Url = `${Constants.url}/profile`;

const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
};

export const createProfile = async (inputData: profileType) => {
  const url = `${Url}`;
  const data = {
    website: inputData.website,
    inventnexusPage: inputData.inventnexusPage,
    location: inputData.location,
    social: inputData.social,
    bio:inputData.bio,
  };
  try {
    const response = await axios.post(url, data, headers);
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

export const getProfile = async (userId: string) => {
  if (!userId) {
    console.error("user Id is required");
    return { success: false, message: "user Id is required" };
  }
  const url = `${Url}/${userId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
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

export const updateProfile = async (inputData: profileType) => {
  if (!inputData.userId) {
    console.error("user Id is required");
    return { success: false, message: "user Id is required" };
  }

  const url = `${Url}/${inputData.userId}`;
  const data = {
    userName: inputData.userName,
    userEmail: inputData.userEmail,
    userRole: inputData.userRole,
    profilePicture: inputData.profilePicture,
    website: inputData.website,
    inventnexusPage: inputData.inventnexusPage,
    location: inputData.location,
    social: inputData.social,
    bio: inputData.bio,
  };
  try {
    const response = await axios.put(url, data, headers);
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

export const deleteProfile = async (userId: string) => {
  if (!userId) {
    console.error("user Id is required");
    return { success: false, message: "user Id is required" };
  }

  const url = `${Url}/${userId}`;
  try {
    const response = await axios.delete(url, headers);
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
