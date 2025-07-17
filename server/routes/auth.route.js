import express from "express";
import { login, signup } from "../controllers/auth-controller.js";
import {
  checkUserValidationSchema,
  loginValidationSchema,
} from "../utils/validationSchema.js";

const router = express.Router();

router.post("/signup", checkUserValidationSchema, signup);
router.post("/login", loginValidationSchema, login);

export default router;
