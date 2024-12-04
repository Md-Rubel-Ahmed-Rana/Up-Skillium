import { Types } from "mongoose";

export type INewStudent = {
  user: Types.ObjectId | string;
  studentId: string;
  courses: Array<Types.ObjectId>;
};
