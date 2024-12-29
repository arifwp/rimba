import { Document } from "mongoose";

export interface UserInterface extends Document {
  id: string;
  name: string;
  email: string;
  age: number;
}
