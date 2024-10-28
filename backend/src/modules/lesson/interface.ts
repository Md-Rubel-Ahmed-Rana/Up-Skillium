import { Types } from "mongoose";
import { IQuizQuestion } from "../quiz/interface";

export type ILesson = {
  title: string;
  type: "video" | "instruction" | "quiz" | "assignment";
  moduleId: Types.ObjectId;
  videoLength?: number;
  videoUrl?: string;
  content?: string;
  quizQuestions?: IQuizQuestion[];
  serial: number;
};
