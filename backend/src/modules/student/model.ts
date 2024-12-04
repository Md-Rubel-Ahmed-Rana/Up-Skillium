import { model, Schema } from "mongoose";
import { INewStudent } from "./interface";
import schemaOption from "../../utils/schemaOption";

const studentSchema = new Schema<INewStudent>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    studentId: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  schemaOption
);

export const Student = model("Student", studentSchema);
