import { model, Schema } from "mongoose";
import { IAdmin } from "./interface";
import schemaOption from "../../utils/schemaOption";

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
  schemaOption
);

export const Admin = model("Admin", adminSchema);
