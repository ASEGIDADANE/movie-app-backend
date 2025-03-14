import mongoose, { Document } from "mongoose";
import { z } from "zod";

interface IUser extends Document {
  email: string;
  password: string;
  Image?: string;
  searchHistory?: any[];
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    default: ""
  },
  searchHistory: {
    type: Array,
    default: []
  }
});



const userValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  Image: z.string().optional(),
  searchHistory: z.array(z.any()).optional()
});

const usersignupValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    });

const User = mongoose.model<IUser>("User", userSchema);
export default User;

export { IUser, userSchema, userValidationSchema, usersignupValidationSchema };