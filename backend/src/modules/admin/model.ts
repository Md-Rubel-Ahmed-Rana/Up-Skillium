import { model, Schema } from "mongoose";
import { IAdmin } from "./interface";

const adminSchema = new Schema<IAdmin>(
  {
    bio: { type: String, required: true },
    adminId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      website: { type: String },
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
);

export const Admin = model("Admin", adminSchema);
