import User from "../../models/user";
import { IPost } from "../../models/post";

export const populateSchemaMarkup = async (data: IPost) => {
  // Fetch author name
  const author = await User.findById(data.author).select("username");

  if (author) {
    data.schemaMarkup.author = {
      "@type": "Person",
      name: author.username,
    };
  }

  return data.schemaMarkup; // Return the updated schemaMarkup
};
