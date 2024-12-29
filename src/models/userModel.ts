import mongoose, { Schema } from "mongoose";
import { UserInterface } from "../interfaces/userInterface";
import { v4 as uuidv4 } from "uuid";

export const UserSchema: Schema<UserInterface> = new Schema<UserInterface>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: [true, "Nama Harus diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email Harus diisi"],
      unique: true,
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: "Gunakan email yang valid",
      },
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;
