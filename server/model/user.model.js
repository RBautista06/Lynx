import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
      maxLength: 100,
    },
    gender: {
      type: String,
      default: "",
    },
    followers: [
      {
        // This stores the ID of another user (who is following this user)
        type: mongoose.Schema.Types.ObjectId, // It's a special type used to store a reference to another document
        ref: "User", // It means this ID comes from the "User" collection
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpriesAt: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
