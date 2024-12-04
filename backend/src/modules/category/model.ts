import { model, Schema } from "mongoose";
import { ICategory } from "./interface";
import schemaOption from "../../utils/schemaOption";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  schemaOption
);

export const Category = model("Category", categorySchema);
