import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// DB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB ERROR:", err));

// server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});