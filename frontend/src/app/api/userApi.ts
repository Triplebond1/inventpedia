import { Constants } from "./utilities/constants";
import axios from "axios";
import { userType } from "./utilities/type";

const Url = `${Constants.url}/users`;

const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
};

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const url = `${Url}`;
  const data = { username, email, password };
  try {
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

export const getUser = async (userId: string) => {
  if (!userId) {
    console.error("User ID is required");
    return { success: false, message: "User ID is required" };
  }
  const url = `${Url}/${userId}`;
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

export const getAllUsers = async () => {
  const url = `${Url}`;
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

export const updateUser = async (inputData: userType) => {
  const url = `${Url}/${inputData.userId}`;
  const updateData = {
    username: inputData.username,
    email: inputData.email,
    password: inputData.password,
    role: inputData.role,
    profilePicture: inputData.profilePicture,
  };
  try {
    const response = await axios.put(url, updateData, headers);

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

export const deleteUser = async (userId: string) => {
  if (!userId) {
    console.error("User ID is required");
    return { success: false, message: "User ID is required" };
  }
  const url = `${Url}/${userId}`;
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

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   // Simulate successful registration
//   if (email && password) {
//     return NextResponse.json({ success: true });
//   } else {
//     return NextResponse.json({ error: "Invalid data" }, { status: 400 });
//   }
