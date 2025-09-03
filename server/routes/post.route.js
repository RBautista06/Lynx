import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getPost, uploadPost } from "../controllers/post-controller.js";

const router = express.Router();

router.post("/upload", protectRoute, uploadPost);
router.post("/getpost", protectRoute, getPost);

export default router;
