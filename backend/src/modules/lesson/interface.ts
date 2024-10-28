import { IQuizQuestion } from "../quiz/interface";

export type ILesson = {
  title: string;
  type: "video" | "instruction" | "quiz";
  videoLength?: number;
  videoUrl?: string;
  content?: string;
  quizQuestions?: IQuizQuestion[];
  serial: number;
};
