import { IQuizQuestion } from "./quiz.type";

export type ICourseProgress = {
  course: {
    image: string;
    title: string;
    id: string;
  };
  isCourseCompleted: boolean;
  completionPercentage: number;
  modules: IModuleProgress[];
  lastCompletedLesson: ILessonDetails;
};

export type IModuleProgress = {
  module: {
    title: string;
    id: string;
  };
  isModuleCompleted: boolean;
  lessons: ILessonProgress[];
};

export type ILessonProgress = {
  lesson: {
    title: string;
    module: string;
    type: string;
    id: string;
  };
  isLessonCompleted: boolean;
  isAssignmentSubmitted: boolean;
  isQuizSubmitted: boolean;
};

export type ILessonDetails = {
  title: string;
  type: string;
  module: string;
  serial: number;
  videoUrl: string;
  videoLength: number;
  quizQuestions: IQuizQuestion[];
  createdAt: string;
  updatedAt: string;
  id: string;
};
