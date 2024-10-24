import { model, Schema } from "mongoose";
import { IInstructor } from "./interface";

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
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
);

export const Instructor = model("Instructor", instructorSchema);
