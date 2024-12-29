import { Request, Response } from "express";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;

  try {
    const newUser = new User({
      name: name,
      email: email,
      age: age,
    });

    const user = await newUser.save();

    res.status(201).json({ message: "Sukses menambahkan user baru", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const update = {
      name: name,
      email: email,
      age: age,
    };

    await User.findByIdAndUpdate(id, update, { new: true });

    res
      .status(200)
      .json({ status: true, message: "Berhasil mengubah data user" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Berhasil mendapatkan semua user",
      users,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetailUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({
      message: "Berhasil mendapatkan detail user",
      user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "Berhasil menghapus user",
      user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
