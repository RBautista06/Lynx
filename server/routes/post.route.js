import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { uploadPost } from "../controllers/post-controller.js";

const router = express.Router();

router.post("/upload", protectRoute, uploadPost);

export default router;
