export type IQuizQuestion = {
  id: string;
  module: string;
  question: string;
  correctAnswer: string;
  options: string[];
};

export type ICreateQuizQuestion = {
  module: string;
  question: string;
  correctAnswer: string;
  options: string[];
};
