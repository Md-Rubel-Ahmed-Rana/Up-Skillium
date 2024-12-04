import { model, Schema } from "mongoose";
import schemaOption from "../../utils/schemaOption";
import { ICertificate } from "./interface";

const certificateSchema = new Schema<ICertificate>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
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
  schemaOption
);

export const Certificate = model("Certificate", certificateSchema);
