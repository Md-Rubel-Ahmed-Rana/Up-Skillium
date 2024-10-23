import { model, Schema } from "mongoose";
import { INewStudent } from "./interface";

const studentSchema = new Schema<INewStudent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    coursesEnrolled: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
);

export const Student = model("Student", studentSchema);
