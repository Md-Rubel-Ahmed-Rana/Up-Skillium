import { ICreateQuizQuestion, IQuizQuestion } from "./quiz.type";

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

export type ICreateLesson =
  | ICreateQuizLesson
  | ICreateAssignmentOrInstructionLesson
  | FormData;

export type ICreateQuizLesson = {
  title: string;
  type: "video" | "instruction" | "quiz" | "assignment";
  module: string;
  content: string;
  serial: number;
  quizQuestions: ICreateQuizQuestion;
};

export type ICreateAssignmentOrInstructionLesson = {
  title: string;
  type: "video" | "instruction" | "quiz" | "assignment";
  module: string;
  content: string;
  serial: number;
};

export type ICreateVideoLesson = {
  title: string;
  type: "video" | "instruction" | "quiz" | "assignment";
  module: string;
  videoLength: number;
  serial: number;
  video: any;
};
