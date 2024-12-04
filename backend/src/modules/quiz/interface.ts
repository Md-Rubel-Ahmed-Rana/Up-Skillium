import { Types } from "mongoose";
import { ILesson } from "../lesson/interface";

export type IQuizQuestion = {
  module: Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type INewQuiz = {
  quizzes: IQuizQuestion[];
  lesson: ILesson;
};
