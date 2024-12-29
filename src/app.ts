import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("Failed to connect to MongoDB", err));

export default app;
