export type IQuizQuestion = {
  id: string;
  module: string;
  question: string;
  correctAnswer: string;
  options: string[];
};

export type IGetQuizQuestion = {
  id: string;
  module: {
    id: string;
    title: string;
  };
  question: string;
  correctAnswer: string;
  options: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type ICreateQuizQuestion = {
  module: string;
  question: string;
  correctAnswer: string;
  options: string[];
};
