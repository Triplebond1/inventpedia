import mongoose, { Document, Schema, Model } from "mongoose";

// Define the User interface extending Mongoose's Document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  profileId?: unknown;
  createdAt: Date;
}

// Define the schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: [
        "admin",
        "author",
        "contributor",
        "editor",
        "guest",
        "moderator",
        "reviewer",
        "subscriber",
      ],
      default: "subscriber",
    },
    profileId: {
      type: mongoose.Types.ObjectId,
      ref: "Profile"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create and export the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
