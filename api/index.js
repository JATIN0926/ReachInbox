import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connect to DB!!");
  })
  .catch((error) => {
    console.log(error);
  });


const app = express();

app.use(express.json());
app.use(cookieParser());

//routes

app.use("/api/auth", authRoutes);




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
