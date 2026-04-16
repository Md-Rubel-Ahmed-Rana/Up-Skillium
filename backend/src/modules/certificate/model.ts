import { model, Schema } from "mongoose";
import { ICertificate } from "./interface";
import schemaOption from "@/utils/schemaOption";

const certificateSchema = new Schema<ICertificate>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    course: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    courseName: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    certificateUrl: {
      type: String,
      required: true,
    },
  },
  schemaOption,
);

export const Certificate = model("Certificate", certificateSchema);
