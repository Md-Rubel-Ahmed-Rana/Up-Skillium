import { Types } from "mongoose";
import { ICreateUser } from "../user/user.interface";

export type INewStudent = {
  userId: Types.ObjectId | string;
  user: ICreateUser;
  role: string;
  studentId: string;
  coursesEnrolled: Array<Types.ObjectId>;
};
