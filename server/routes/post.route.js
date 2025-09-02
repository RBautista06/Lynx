import express from "express";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.post("/upload", protectRoute);

export default router;
