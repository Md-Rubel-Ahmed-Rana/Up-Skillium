export type IQuizAnswer = {
  question: string;
  givenAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export type IQuizSubmissionResult = {
  id: string;
  userId: string;
  lessonId: string;
  totalQuiz: number;
  correctAnswers: number;
  wrongAnswers: number;
  modifiedQuizAnswers: IQuizAnswer[];
};
