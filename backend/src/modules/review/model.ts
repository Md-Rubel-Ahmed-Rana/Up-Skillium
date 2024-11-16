import { model, Schema } from "mongoose";
import { IReview } from "./interface";
import schemaOption from "../../utils/schemaOption";

const reviewSchema = new Schema<IReview>(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewTo: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "reviewToModel",
    },
    reviewToModel: {
      type: String,
      required: true,
      enum: ["User", "Course"],
    },
    feedback: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  schemaOption
);

export const Review = model<IReview>("Review", reviewSchema);
