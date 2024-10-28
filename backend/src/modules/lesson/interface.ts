import { IQuizQuestion } from "../quiz/interface";

export type ILesson = {
  title: string;
  type: "content" | "instruction" | "quiz" | "assignment";
  videoLength?: number;
  videoUrl?: string;
  content?: string;
  quizQuestions?: IQuizQuestion[];
  serial: number;
};
