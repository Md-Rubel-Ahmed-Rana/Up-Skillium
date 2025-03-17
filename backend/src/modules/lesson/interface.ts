import { Types } from "mongoose";
import { IQuizQuestion } from "../quiz/interface";

export type ILesson = {
  id: Types.ObjectId;
  title: string;
  type: "video" | "instruction" | "quiz" | "assignment";
  module: Types.ObjectId;
  videoLength?: number;
  videoUrl?: string;
  content?: string;
  quizQuestions?: Types.ObjectId[];
  serial: number;
};

export type ICreateQuizLesson = {
  title: string;
  type: "video" | "instruction" | "quiz" | "assignment";
  module: Types.ObjectId;
  content: string;
  quizQuestions: IQuizQuestion[];
  serial: number;
};

export type IQuizUpdateOnLesson = {
  id: Types.ObjectId;
  module: Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer: string;
};
