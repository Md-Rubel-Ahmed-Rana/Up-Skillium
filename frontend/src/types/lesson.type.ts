import { IQuizQuestion } from "./quiz.type";

export type ILesson = {
  id: string;
  quizQuestions: IQuizQuestion[];
  serial: number;
  title: string;
  type: "assignment" | "instruction" | "quiz" | "video";
  module: string;
  content: string;
  videoLength: number;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
};
