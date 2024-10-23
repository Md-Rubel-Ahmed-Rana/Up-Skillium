import { Types } from "mongoose";
import { ICreateUser } from "../user/user.interface";

export type INewStudent = {
  userId: Types.ObjectId | string;
  user: ICreateUser;
  studentId: string;
  coursesEnrolled: Array<Types.ObjectId>;
};
