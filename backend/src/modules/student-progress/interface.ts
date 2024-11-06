import { Types } from "mongoose";

export type IStudentProgress = {
  user: Types.ObjectId;
  courses: ICourseForProgress[];
};

export type ICourseForProgress = {
  course: Types.ObjectId;
  isCourseCompleted: boolean;
  completionPercentage?: number;
  lastCompletedLesson: Types.ObjectId | null;
  modules: IModuleForProgress[];
};

export type IModuleForProgress = {
  module: Types.ObjectId;
  isModuleCompleted: boolean;
  lessons: ILessonForProgress[];
};

export type ILessonForProgress = {
  lesson: Types.ObjectId;
  isLessonCompleted: boolean;
};

export type IProgressCalculate = {
  completionPercentage: number;
  modules: ModuleProgress[];
};

type ModuleProgress = {
  lessons: LessonProgress[];
};

type LessonProgress = {
  isLessonCompleted: boolean;
};
