import { matchedData, validationResult } from "express-validator";
import { User } from "../model/user.js";
import { hashPassword } from "../utils/hashPass.js";

export const signup = async (req, res) => {
  const result = validationResult(req);
  // if the result is not empty
  if (!result.isEmpty()) {
    const errorMessage = result.array().map((err) => err.msg);
    return res.status(400).json({ message: errorMessage });
  }
  const data = matchedData(req);
  const { fullName, username } = data;
  const email = data.email.toLowerCase();
  const hashedPassword = await hashPassword(data.password);

  const usernameAlreadyExist = await User.findOne({ username });
  const emailAlreadyExist = await User.findOne({ email });

  if (usernameAlreadyExist) {
    return res
      .status(400)
      .json({ message: "Username already exist. Please choose another one" });
  }
  if (emailAlreadyExist) {
    return res.status(400).json({
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
    return res.status(201).json({
      success: true,
      message: "Signed up successfully",
      user: { ...user_doc, password: undefined },
    });
  } catch (error) {
    console.log("Error saving new User: ", error);
    return res.status(400).json({ msg: "Error Signing up" });
  }
};
