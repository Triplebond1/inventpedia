import User from "../../models/user";

const populateSchemaMarkup = async (data) => {
    // Fetch author name
  
      const author = await User.findById(data.author).select("username");
      if (author) {
        return data.schemaMarkup.author = {
          "@type": "Person",
          name: author.username,
        };
      }
  
    
  };
  
  module.exports = populateSchemaMarkup;
  