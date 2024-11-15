import { model, Schema } from "mongoose";
import { IInstructor } from "./interface";
import schemaOption from "../../utils/schemaOption";

const instructorSchema = new Schema<IInstructor>(
  {
    bio: { type: String },
    teacherId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    ratings: {
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },
  },
  schemaOption
);

export const Instructor = model("Instructor", instructorSchema);
