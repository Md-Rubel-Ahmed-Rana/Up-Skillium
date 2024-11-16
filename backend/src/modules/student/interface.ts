import { Types } from "mongoose";

export type INewStudent = {
  user: Types.ObjectId | string;
  studentId: string;
  coursesEnrolled: Array<Types.ObjectId>;
};
