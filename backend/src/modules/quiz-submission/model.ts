import { model, Schema, Types } from "mongoose";
import { IQuizSubmission, IModifiedAnswer } from "./interface";
import schemaOption from "../../utils/schemaOption";

const modifiedAnswerSchema = new Schema<IModifiedAnswer>(
  {
    question: {
      type: String,
      required: true,
    },
    givenAnswer: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const quizSubmissionSchema = new Schema<IQuizSubmission>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    totalQuiz: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    wrongAnswers: {
      type: Number,
      required: true,
    },
    modifiedQuizAnswers: {
      type: [modifiedAnswerSchema],
      required: true,
    },
  },
  schemaOption
);

export const QuizSubmission = model<IQuizSubmission>(
  "QuizSubmission",
  quizSubmissionSchema
);
