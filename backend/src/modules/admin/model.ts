import { model, Schema } from "mongoose";
import { IAdmin } from "./interface";
import schemaOption from "../../utils/schemaOption";

const adminSchema = new Schema<IAdmin>(
  {
    adminId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  schemaOption
);

export const Admin = model("Admin", adminSchema);
