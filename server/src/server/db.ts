import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();
export const connectDB = async () => {
  if (!process.env.MONGO_URI ) {
    console.error("❌ MONGO_URI is not defined in the environment variables.");
    process.exit(1);
  }

  const shutdown = async () => {
    console.log("🔻 Shutting down gracefully...");
    await mongoose.connection.close();
    console.log("✅ MongoDB connection closed.");
    process.exit(0);
  };

  mongoose.connection.on("connected", () => {
    console.log("✅ Mongoose connected to the database.");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ Mongoose connection is disconnected.");
  });

  mongoose.connection.on("error", (err: any) => {
    console.error(`❌ Mongoose connection error: ${err.message}`);
  });

  await mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("✅ Connected to MongoDB");

      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    })
    .catch((err: any) => {
      console.error(
        `❌ Failed to connect to MongoDB at ${process.env.MONGO_URI}:`,
        err.message
      );
      process.exit(1);
    });
};

