import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export const validateUserInput = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { name, email, age } = req.body;

  try {
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Nama harus berupa string dan tidak boleh kosong" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Email harus valid" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    if (!age || typeof age !== "number" || age <= 0) {
      return res
        .status(400)
        .json({ message: "Umur harus berupa angka positif" });
    }

    next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
