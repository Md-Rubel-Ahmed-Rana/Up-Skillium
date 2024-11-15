import { Types } from "mongoose";

export type ILesson = {
  title: string;
  type: "video" | "instruction" | "quiz" | "assignment";
  module: Types.ObjectId;
  videoLength?: number;
  videoUrl?: string;
  content?: string;
  quizQuestions?: Types.ObjectId[];
  serial: number;
};

export type IQuizUpdateOnLesson = {
  id: Types.ObjectId;
  module: Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer: string;
};
