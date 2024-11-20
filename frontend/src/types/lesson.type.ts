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

export type IGetLesson = {
  id: string;
  quizQuestions: IQuizQuestion[];
  serial: number;
  title: string;
  type: "assignment" | "instruction" | "quiz" | "video";
  module: {
    id: string;
    title: string;
    serial: number;
  };
  content: string;
  videoLength: number;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type ICreateLesson = {
  title: string;
  type: "video" | "instruction" | "quiz" | "assignment";
  module: string;
  videoLength?: number;
  videoUrl?: string;
  content?: string;
  quizQuestions?: string[];
  serial: number;
};
