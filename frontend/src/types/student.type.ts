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

export type IMyStudent = {
  student: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  courses: [
    {
      id: string;
      image: string;
      title: string;
    }
  ];
};
