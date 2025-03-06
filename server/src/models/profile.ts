import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProfile extends Document {
  fullName?: string;
  userName: mongoose.Types.ObjectId;
  userEmail: mongoose.Types.ObjectId;
  userRole: mongoose.Types.ObjectId;
  profilePicture?: string;
  website?: string;
  inventpediaPage?: string;
  location?: string;
  social?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  bio?: string;
  createdAt?: Date;
}


const profileSchema = new Schema<IProfile>(
  {
    fullName: {
      type: String,
      trim: true,
      default: null,
    },

    userName: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensures this field is always present
    },

    userEmail: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userRole: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    profilePicture: {
      type: String,
    },

    website: {
      type: String,
      trim: true,
      default: null,
    },

    inventpediaPage: {
      type: String,
      trim: true,
      default: null,
    },

    location: {
      type: String,
      trim: true,
      default: null,
    },

    social: {
      twitter: { type: String, trim: true, default: null },
      facebook: { type: String, trim: true, default: null },
      linkedin: { type: String, trim: true, default: null },
      instagram: { type: String, trim: true, default: null },
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);


const Profile: Model<IProfile> = mongoose.model<IProfile>("Profile", profileSchema);
export default Profile;
