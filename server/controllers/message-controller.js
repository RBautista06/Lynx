import Message from "../model/message.model.js";
import { User } from "../model/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverId, io } from "../lib/socket.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.userId;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("_id fullName username profilePic"); // i will only pass this info in sidebar

    return res
      .status(200)
      .json({ success: true, filteredUsers: filteredUsers });
  } catch (error) {
    console.log("Error Filtering Users for Sidebar", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Error Filtering Users for Sidebar" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.userId;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json({ sucess: true, messages: messages });
  } catch (error) {
    console.log("Error in getMessages controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Error getting Messages" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    let imageURL;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageURL = uploadImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });

    await newMessage.save();
    // realtime functionality goes here => socket.io
    //"io.to" will only broadcast it to a certain reciever

    const recieverSocketId = getRecieverId(receiverId); // Look up the socket ID of the recipient using their user ID.

    // This function should return the current socket ID associated with the user if they are online.
    if (recieverSocketId) {
      // Only proceed if the recipient is connected (has a valid socket ID)
      io.to(recieverSocketId).emit("newMessage", newMessage);
      // Send the new message to the specific socket (user) using Socket.IO.
      // Only the intended recipient will receive this event in real time.
    }
    return res.status(201).json({ success: true, newMessage: newMessage });
  } catch (error) {
    console.log("Error sending Message: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Error sending Message" });
  }
};
