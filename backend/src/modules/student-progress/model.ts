import { model, Schema, Types } from "mongoose";
import schemaOption from "../../utils/schemaOption";
import {
  ICourseForProgress,
  ILessonForProgress,
  IModuleForProgress,
  IStudentProgress,
} from "./interface";

const lessonSchema = new Schema<ILessonForProgress>(
  {
    lesson: {
      type: Schema.Types.ObjectId,
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

const moduleSchema = new Schema<IModuleForProgress>(
  {
    module: {
      type: Schema.Types.ObjectId,
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

const courseSchema = new Schema<ICourseForProgress>(
  {
    course: {
      type: Schema.Types.ObjectId,
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
    lastCompletedLesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
    modules: {
      type: [moduleSchema],
      required: true,
    },
  },
  { _id: false }
);

const studentProgressSchema = new Schema<IStudentProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
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

export const StudentProgress = model<IStudentProgress>(
  "StudentProgress",
  studentProgressSchema
);
