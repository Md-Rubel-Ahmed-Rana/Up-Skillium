import { ICourse } from "./course.type";
import { IUser } from "./user.type";

export type IStudent = {
  id: string;
  studentId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  courses: ICourse[];
};
