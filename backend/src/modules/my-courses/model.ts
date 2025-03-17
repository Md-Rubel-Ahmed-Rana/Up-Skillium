import { model, Schema } from "mongoose";
import { IMyCourse } from "./interface";
import schemaOption from "../../utils/schemaOption";

const myCourseSchema = new Schema<IMyCourse>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    lastCompletedLesson: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Lesson",
    },
    completionPercentage: {
      type: Number,
      default: 0,
    },
    isCourseCompleted: {
      type: Boolean,
      default: false,
    },
  },
  schemaOption
);

export const MyCourse = model<IMyCourse>("MyCourse", myCourseSchema);
