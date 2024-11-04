import { Types } from "mongoose";

export type IEnrollment = {
  userId: Types.ObjectId;
  studentObjectId: Types.ObjectId;
  courseId: Types.ObjectId;
  enrollmentDate: Date;
};
