import { model, Schema, Types } from "mongoose";
import schemaOption from "../../utils/schemaOption";

const lessonSchema = new Schema(
  {
    lessonId: {
      type: Types.ObjectId,
      required: true,
      ref: "Lesson",
    },
    isLessonCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const moduleSchema = new Schema(
  {
    moduleId: {
      type: Types.ObjectId,
      required: true,
      ref: "Module",
    },
    isModuleCompleted: {
      type: Boolean,
      default: false,
    },
    lessons: {
      type: [lessonSchema],
      required: true,
    },
  },
  { _id: false }
);

const courseSchema = new Schema(
  {
    courseId: {
      type: Types.ObjectId,
      required: true,
      ref: "Course",
    },
    isCourseCompleted: {
      type: Boolean,
      default: false,
    },
    completionPercentage: {
      type: Number,
      default: 0,
    },
    lastLessonCompleted: {
      type: Types.ObjectId,
      ref: "Lesson",
    },
    modules: {
      type: [moduleSchema],
      required: true,
    },
  },
  { _id: false }
);

const studentProgressSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    courses: {
      type: [courseSchema],
      required: true,
    },
  },
  schemaOption
);

export const StudentProgress = model("StudentProgress", studentProgressSchema);
