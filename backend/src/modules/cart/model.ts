import { model, Schema } from "mongoose";
import { ICart } from "./interface";
import schemaOption from "@/utils/schemaOption";

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  schemaOption,
);

export const Cart = model("Cart", cartSchema);
