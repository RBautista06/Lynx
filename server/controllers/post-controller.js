import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const uploadPost = async (req, res) => {
  try {
    const { caption, media, privacy } = req.body;
    const author = req.userId;
    let mediaURLs = [];

    if (media) {
      if (Array.isArray(media)) {
        // const uploads = await Promise.all(
        //   image.map((m) => cloudinary.uploader.upload(m))
        // );
        // mediaURLs = uploads.map((upload) => upload.secureURL);
        mediaURLs = media;
      } else {
        // const singleUpload = await cloudinary.uploader.upload(media);
        // mediaURLs.push(singleUpload.secure_url);
        mediaURLs.push(singleUpload);
      }
    }

    const newPost = new Post({
      author,
      caption,
      media,
      privacy,
    });

    await newPost.save();

    return res.status(201).json({ success: true, newPost: newPost });
  } catch (error) {
    console.log("Error Uploading Post", error);
    return res
      .status(500)
      .json({ success: false, message: "Error uploading post" });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, posts: posts });
  } catch (error) {
    console.log("Error Fetching Posts", error);
    return res
      .status(500)
      .json({ success: false, message: "Error Fetching Post" });
  }
};
