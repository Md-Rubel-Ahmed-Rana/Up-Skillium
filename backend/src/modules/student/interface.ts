import { Types } from "mongoose";

export type INewStudent = {
  userId: Types.ObjectId | string;
  studentId: string;
  coursesEnrolled: Array<Types.ObjectId>;
};
