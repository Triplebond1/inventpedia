// Code for CRUD operations on categories
import "dotenv/config";
import axios from "axios";



const Url = `${process.env.INVENT_NEXUS_API}/categories`;
const headers = { headers: {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
},
withCredentials: true,
} 

export const createCategory = async (name: string, description: string) => {
  const data = { name, description };
  try {
    const response = await axios.post(Url, data, headers);
    return response.data;
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

export const getCategoryById = async (categoryId: string) => {
  const url = `${Url}/${categoryId}`;
  try {
    const response = await axios.get(url, headers);
    return response.data;
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

export const getAllCategories = async () => {
  try {
    const response = await axios.get(Url, headers);
    return response.data;
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

export const updateCategory = async (categoryId: string, name:string, description: string) => {
  const url = `${Url}/${categoryId}`;
  const data = { name, description };
  try {
    const response = await axios.put(url, data, headers);
    return response.data;
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

export const deleteCategory = async (categoryId: string) => {
  const url = `${Url}/${categoryId}`;
  try {
    const response = await axios.delete(url, headers);
    return response.data;
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
