import { Types } from "mongoose";

export type IMyCourse = {
  user: Types.ObjectId;
  course: Types.ObjectId;
  completedLessons?: Types.ObjectId[];
  lastCompletedLesson?: Types.ObjectId;
  nextLesson?: Types.ObjectId;
  isCourseCompleted?: boolean;
  completionPercentage?: number;
};
