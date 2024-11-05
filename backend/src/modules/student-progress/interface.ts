import { Types } from "mongoose";

export type IStudentProgress = {
  userId: Types.ObjectId;
  courses: ICourseForProgress[];
};

export type ICourseForProgress = {
  courseId: Types.ObjectId;
  isCourseCompleted: boolean;
  completionPercentage?: number;
  lastLessonCompleted: Types.ObjectId | null;
  modules: IModuleForProgress[];
};

export type IModuleForProgress = {
  moduleId: Types.ObjectId;
  isModuleCompleted: boolean;
  lessons: ILessonForProgress[];
};

export type ILessonForProgress = {
  lessonId: Types.ObjectId;
  isLessonCompleted: boolean;
};
