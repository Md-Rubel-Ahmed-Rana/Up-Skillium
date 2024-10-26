import { model, Schema } from "mongoose";
import { ICategory } from "./interface";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
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

export const Category = model("Category", categorySchema);
