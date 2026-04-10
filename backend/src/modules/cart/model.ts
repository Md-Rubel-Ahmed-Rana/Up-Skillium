import { model, Schema } from "mongoose";
import schemaOption from "../../utils/schemaOption";
import { ICart } from "./interface";

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
  schemaOption
);

export const Cart = model("Cart", cartSchema);
