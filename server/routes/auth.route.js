import express from "express";
import { signup } from "../controllers/auth-controller.js";
import { checkUserValidationSchema } from "../utils/validationSchema.js";
import { checkSchema } from "express-validator";

const router = express.Router();

router.post("/signup", checkSchema(checkUserValidationSchema), signup);

export default router;
