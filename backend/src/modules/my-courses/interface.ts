import { Types } from "mongoose";

export type IMyCourse = {
  user: Types.ObjectId;
  course: Types.ObjectId;
  completedLessons: Types.ObjectId[];
  isCourseCompleted: boolean;
  completionPercentage: number;
};
