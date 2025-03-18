import { ICourse } from "./course.type";
import { ILesson } from "./lesson.type";
import { IUser } from "./user.type";

export type IMyCourse = {
  user: IUser;
  course: ICourse;
  completedLessons: string[];
  lastCompletedLesson: ILesson;
  nextLesson: ILesson;
  isCourseCompleted: boolean;
  completionPercentage: number;
};
