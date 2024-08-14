import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connect to DB!!");
  })
  .catch((error) => {
    console.log(error);
  });

  const __dirname = path.resolve();

const app = express();


app.use(express.json());
app.use(cookieParser());

//routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/onebox", messageRoutes);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

//middlewares

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server running !!");
});
