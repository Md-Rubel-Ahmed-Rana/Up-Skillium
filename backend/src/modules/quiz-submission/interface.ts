import { Types } from "mongoose";

export type IQuizSubmission = {
  userId: Types.ObjectId;
  lessonId: Types.ObjectId;
  totalQuiz: number;
  correctAnswers: number;
  wrongAnswers: number;
  modifiedQuizAnswers: IModifiedAnswer[];
};

export type IQuizSubmitData = {
  id: string;
  answer: string;
};

export type IModifiedAnswer = {
  question: string;
  givenAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};
