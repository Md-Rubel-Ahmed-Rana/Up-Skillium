import { Schema, Document, model } from "mongoose";
import { IEnrollment } from "./interface";
import schemaOption from "../../utils/schemaOption";

const EnrollmentSchema = new Schema<IEnrollment & Document>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentSessionId: {
      type: String,
      required: true,
    },
    paymentSessionUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "failed",
    },
  },
  schemaOption
);

export const Enrollment = model<IEnrollment & Document>(
  "Enrollment",
  EnrollmentSchema
);
