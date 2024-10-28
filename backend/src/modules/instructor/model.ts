import { model, Schema } from "mongoose";
import { IInstructor } from "./interface";
import schemaOption from "../../utils/schemaOption";

const instructorSchema = new Schema<IInstructor>(
  {
    bio: { type: String, required: true },
    teacherId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      website: { type: String },
    },
    ratings: {
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },
  },
  schemaOption
);

export const Instructor = model("Instructor", instructorSchema);
