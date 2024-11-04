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
    studentObjectId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  schemaOption
);

export const Enrollment = model<IEnrollment & Document>(
  "Enrollment",
  EnrollmentSchema
);
