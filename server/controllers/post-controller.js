import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const uploadPost = async (req, res) => {
  try {
    const { caption, media } = req.body;

    let mediaURLs = [];

    if (media) {
      if (Array.isArray(media)) {
        // const uploads = await Promise.all(
        //   image.map((m) => cloudinary.uploader.upload(m))
        // );
        // mediaURLs = uploads.map(upload => upload.secureURL)
        mediaURLs = media;
      } else {
        // const singleUpload = await cloudinary.uploader.upload(media)
        // mediaURLs.push(singleUpload.secure_url)
        mediaURLs.push(singleUpload);
      }
    }

    const newPost = {
      caption,
      media,
    };
    return res.status(201).json({ success: true, newPost: newPost });
  } catch (error) {
    console.log("Error Uploading Post");
    return res.status(401).json({ success: false, newPost: newPost });
  }
};
