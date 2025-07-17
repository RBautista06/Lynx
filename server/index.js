import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json()); // this is for parsing the application/json
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello bitches");
});

// app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
