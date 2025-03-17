import { Types } from "mongoose";

export type IMyCourse = {
  user: Types.ObjectId;
  course: Types.ObjectId;
  lastCompletedLesson: Types.ObjectId;
  isCourseCompleted: boolean;
  completionPercentage: number;
};
