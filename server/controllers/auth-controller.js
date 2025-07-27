import { matchedData, validationResult } from "express-validator";

import { comparePassword, hashPassword } from "../utils/hashPass.js";
import { generateJWTTOKEN } from "../utils/generateJWTToken.js";
import { User } from "../model/user.model.js";

export const signup = async (req, res) => {
  const result = validationResult(req);
  // if the result is not empty
  if (!result.isEmpty()) {
    const errorMessage = result.array().map((err) => err.msg);
    return res.status(400).json({ success: false, message: errorMessage });
  }
  const data = matchedData(req);
  const { fullName, username } = data;
  const email = data.email.toLowerCase();
  const hashedPassword = await hashPassword(data.password);

  const usernameAlreadyExist = await User.findOne({ username });
  const emailAlreadyExist = await User.findOne({ email });

  if (usernameAlreadyExist) {
    return res.status(400).json({
      success: false,
      message: "Username already exist. Please choose another one",
    });
  }
  if (emailAlreadyExist) {
    return res.status(400).json({
      success: false,
      message: "Email is already registered. Please use a different one",
    });
  }

  try {
    const user = new User({
      fullName,
      username,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    generateJWTTOKEN(res, user._id);
    return res.status(201).json({
      success: true,
      message: "Signed up successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error saving new User: ", error);
    return res
      .status(400)
      .json({ success: false, message: "Error Signing up" });
  }
};
export const login = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = result.array().map((err) => err.msg);
    return res.status(400).json({ success: false, message: errorMessage });
  }

  const data = matchedData(req);
  const { emailOrUsername, password } = data;

  try {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);
    const user = await User.findOne(
      isEmail ? { email: emailOrUsername } : { username: emailOrUsername }
    );

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    generateJWTTOKEN(res, user._id);
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    console.log("Error Logging In", error);
    return res.status(400).json({ success: false, message: "Log in failed" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout Successfully" });
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(409).json({ success: false, message: "No user" });
    }
    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Check Auth Status: Authorized",
      user, // ✅ send full user object
    });
  } catch (error) {
    console.log("error checking auth", error);
    res.status(400).send({ success: false, message: error.message });
  }
};
