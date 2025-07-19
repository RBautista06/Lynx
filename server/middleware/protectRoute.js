import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - No token Found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(409).json({ success: false, message: "No User found" });
    }

    // return user in req.user in request body
    req.userId = user._id;
    next();
  } catch (error) {
    console.log("Error Verifying Token: ", error);
    return res
      .status(401)
      .send({ success: false, message: "Invalid or expired token" });
  }
};
