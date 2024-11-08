import { model, Schema } from "mongoose";
import { ILesson } from "./interface";
import schemaOption from "../../utils/schemaOption";
import { Module } from "../module/model";

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
    module: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    serial: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    videoLength: {
      type: Number,
    },
    quizQuestions: [{ type: Schema.Types.ObjectId, ref: "Quiz", default: [] }],
  },
  schemaOption
);

lessonSchema.post("save", async function (doc) {
  await Module.findByIdAndUpdate(doc.module, {
    $push: { lessons: doc._id },
  });
});

export const Lesson = model("Lesson", lessonSchema);
