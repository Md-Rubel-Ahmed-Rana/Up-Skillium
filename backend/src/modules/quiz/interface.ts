import { Types } from "mongoose";

export type IQuizQuestion = {
  moduleId: Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer: string;
};
