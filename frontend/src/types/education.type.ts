import { IUser } from "./user.type";

export type IEducation = {
  id: string;
  user: IUser;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  isCurrent: boolean;
  startDate: Date;
  endDate: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ICreateEducation = {
  user: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  isCurrent: boolean;
  startDate: Date;
  endDate: Date;
  description: string;
};
