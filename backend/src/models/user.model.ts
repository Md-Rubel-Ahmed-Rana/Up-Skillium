import { Schema, model } from "mongoose";
import { emailRegX } from "../utils/regx";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegX, "Please fill a valid email address"],
    },
    role: {
      type: String,
      lowercase: true,
      default: "user",
      enum: ["user", "admin", "super admin"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

userSchema.index({ email: 1 });

export const User = model<IUser>("User", userSchema);
