import { model, Schema } from "mongoose";
import { ICourse } from "./interface";
import schemaOption from "../../utils/schemaOption";

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    price: {
      original: { type: Number, required: true },
      discount: { type: Number, required: true },
      salePrice: { type: Number, required: true },
    },
    technologies: [String],
    introductoryVideo: {
      type: String,
    },
    tags: { type: [String], required: true },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    duration: { type: String, required: true },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    ratings: {
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  schemaOption
);

export const Course = model("Course", courseSchema);
