import "dotenv/config";
import axios from "axios";


const Url = `${process.env.INVENT_NEXUS_API}/comments`;

const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
};

export const createComment = async(postId: string, parentComment: string, content: string) => {
  const data = { postId, parentComment, content };
  try {
    const response = await axios.post(Url, data, headers);

    console.log("POST request successful. Response:", response.data);
    return response.data;
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

export const updateCommentStatus = async (commentId: string, status: string) => {
  const data = { commentId, status };
  try {
    const response = await axios.put(`${Url}/status`, data, headers);

    console.log("PATCH request successful. Response:", response.data);
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

export const getCommentById = async (commentId: string) => {
  try {
    const response = await axios.get(`${Url}/${commentId}`, headers);

    console.log("GET request successful. Response:", response.data);
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

export const getCommentByPost = async (postId: string) => {
  const url = `${Url}/post/${postId}`;
  try {
    const response = await axios.get(url,headers);

    console.log("GET request successful. Response:", response.data);
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

export const getAllComments = async (status: string) => {
  const url = status ? `${Url}?status=${status}` : Url;
  try {
    const response = await axios.get(url, headers);

    console.log("GET request successful. Response:", response.data);
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

export const updateComment = async (commentId: string, content: string) => {
  const url = `${Url}/${commentId}`;
  const data = { content };
  try {
    const response = await axios.put(url, data, headers);

    console.log("PUT request successful. Response:", response.data);
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

export const deleteComment = async (commentId: string) => {
  const url = `${Url}/${commentId}`;
  try {
    const response = await axios.delete(url,headers);

    console.log("DELETE request successful. Response:", response.data);
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
