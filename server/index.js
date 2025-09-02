import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import postRoutes from "./routes/post.route.js";
import { dbConnection } from "./lib/db.js";
import { app, server } from "./lib/socket.js"; // ✅ Use your socket-exported app/server

dotenv.config();
dbConnection();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello bitches");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/post", postRoutes);

// ✅ Use `server.listen`, not `app.listen`
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server with Socket.IO running on http://localhost:${PORT}`);
});
