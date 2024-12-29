import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getDetailUser,
  updateUser,
} from "../controllers/userController";
import { logRequest } from "../utils/logRequest";
import { validateUserInput } from "../middlewares/validateUserInput";

const userRoute = express.Router();

userRoute.use(logRequest);

userRoute.post("/", validateUserInput, createUser);
userRoute.get("/", getAllUsers);
userRoute.get("/:id", getDetailUser);
userRoute.put("/:id", validateUserInput, updateUser);
userRoute.delete("/:id", deleteUser);

export default userRoute;
