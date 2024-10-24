import { model, Schema } from "mongoose";

const rolesSchema = new Schema(
  {
    role: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
);

export const Role = model("Role", rolesSchema);
