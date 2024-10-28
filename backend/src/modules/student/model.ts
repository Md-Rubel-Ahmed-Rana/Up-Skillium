import { model, Schema } from "mongoose";
import { INewStudent } from "./interface";
import schemaOption from "../../utils/schemaOption";

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
  schemaOption
);

export const Student = model("Student", studentSchema);
