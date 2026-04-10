import { model, Schema } from "mongoose";
import { IQuizQuestion } from "./interface";
import schemaOption from "../../utils/schemaOption";

export const quizSchema = new Schema<IQuizQuestion>(
  {
    module: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Module",
    },
    question: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    options: [String],
  },
  schemaOption
);

export const Quiz = model("Quiz", quizSchema);
