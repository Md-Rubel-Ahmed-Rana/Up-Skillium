import { ILesson } from "./lesson.type";
import { IUser } from "./user.type";

export type IQuizAnswer = {
  question: string;
  givenAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export type IQuizSubmissionResult = {
  id: string;
  user: IUser;
  lesson: ILesson;
  totalQuiz: number;
  correctAnswers: number;
  wrongAnswers: number;
  modifiedQuizAnswers: IQuizAnswer[];
};

export type IQuizSubmissionAnalytics = {
  totalSubmissions: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  highestScore: number;
  lowestScore: number;
  averageScorePercentage: number;
};
