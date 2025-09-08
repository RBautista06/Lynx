import { Post } from "../model/post.model.js";
import cloudinary from "../lib/cloudinary.js";

export const uploadPost = async (req, res) => {
  try {
    const { caption, media, privacy } = req.body;
    const author = req.userId;

    let mediaURLs = [];

    if (media) {
      if (Array.isArray(media)) {
        const uploads = await Promise.all(
          media.map((m) => cloudinary.uploader.upload(m))
        );
        mediaURLs = uploads.map((upload) => upload.secure_url);
      } else {
        const singleUpload = await cloudinary.uploader.upload(media);
        mediaURLs.push(singleUpload.secure_url);
      }
    }

    // use let in this json object so i can populate the username and profilePic
    let newPost = new Post({
      author,
      caption,
      media: mediaURLs,
      privacy,
    });

    await newPost.save();

    // populate author before sending response
    // You got username and profilePic from the User document that is referenced by post.author in the post Schema
    newPost = await newPost.populate("author", "username profilePic");

    return res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.error("Error Uploading Post", error);
    return res
      .status(500)
      .json({ success: false, message: "Error uploading post" });
  }
};

export const getPost = async (_, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "username profilePic")
      .sort({ createdAt: -1 }); // optional: newest first
    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log("Error Fetching Posts", error);
    return res
      .status(500)
      .json({ success: false, message: "Error Fetching Post" });
  }
};
