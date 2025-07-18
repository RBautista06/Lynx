import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/auth-controller.js";
import {
  checkUserValidationSchema,
  loginValidationSchema,
} from "../utils/validationSchema.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", checkUserValidationSchema, signup);
router.post("/login", loginValidationSchema, login);
router.post("/logout", logout);
router.get("/check-auth", verifyToken, checkAuth);
export default router;
