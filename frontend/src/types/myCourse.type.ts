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

type ICourseProgressStats = {
  enrolled: number;
  completed: number;
  courseId: string;
  avgCompletion: number;
};

export type ICourseProgressAnalytics = {
  totalEnrolled: number;
  totalCompleted: number;
  totalInProgress: number;
  averageCompletionPercentage: number;
  perCourseStats: ICourseProgressStats[];
};
