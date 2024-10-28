import { model, Schema } from "mongoose";
import { ILesson } from "./interface";
import schemaOption from "../../utils/schemaOption";
import { quizSchema } from "../quiz/model";

export const lessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    serial: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    videoLength: {
      type: Number,
    },
    quizQuestions: [quizSchema],
  },
  schemaOption
);

export const Lesson = model("Lesson", lessonSchema);
