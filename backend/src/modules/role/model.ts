import schemaOption from "@/utils/schemaOption";
import { model, Schema } from "mongoose";

const rolesSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
  },
  schemaOption,
);

export const Role = model("Role", rolesSchema);
