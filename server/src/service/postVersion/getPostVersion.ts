
import { PostVersion } from "../../models/postVersioning";
import AuthRequest from "../../types/authRequest";
import { Response } from "express";
import {
  validateRequiredField,
} from "../../utilities/helpers/validateField";
import { status } from "../../utilities/enums/statusCode";
import { versionLIst } from "../../types/interface";

export const getAPostVersion = async (
  postId: string,
  versionIndex: number,
): Promise<versionLIst> => {
  try {


    validateRequiredField(postId, "post ID", "string");
    validateRequiredField(versionIndex, "version Index", "number");

    const version = await PostVersion.findOne({ postId: postId });
    if (!version) {
      throw new Error ("Post version not found");
    }
    
    const indexedVersion = version.versionList.find(
      (e) => e.version === versionIndex
    );
    if (!indexedVersion) {
      throw new Error ("version index not found" );
    }
    return  indexedVersion;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const getAllPostVersions = async (postId: string) => {
  try {

    validateRequiredField(postId, "Post ID", "string");
    const version = await PostVersion.findOne({ postId: postId }).select(
      "versionList"
    );
    if (!version) {
      throw new Error ("Post not found" );
    }

    return version;
  } catch (error: any) {
    console.error("Error fetching post versions:", error);
    throw error ;
  }
};
