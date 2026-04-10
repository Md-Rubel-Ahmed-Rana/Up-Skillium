import { model, Schema } from "mongoose";
import schemaOption from "../../utils/schemaOption";

const rolesSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
  },
  schemaOption
);

export const Role = model("Role", rolesSchema);
