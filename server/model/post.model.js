import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
    media: [
      {
        type: String,
      },
    ],
    privacy: {
      type: String,
      enum: ["public", "followers", "private"],
      //In Mongoose, enum lets you restrict a field’s values to a specific set of options (like a dropdown). If you try to save something outside the allowed values, MongoDB will reject it.
      default: "public",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
