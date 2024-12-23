import { ICourse } from "./course.type";
import { IUser } from "./user.type";

export type ICreateLiveClass = {
  title: string;
  description: string;
  instructor: string;
  course: string;
  creator: string;
  startDateTime: string;
  endDateTime: string;
  meetingLink: string;
  topics?: string[];
  tags?: string[];
};

export type IGetLiveClass = {
  id: string;
  title: string;
  description: string;
  instructor: IUser;
  students: IUser[];
  course: ICourse;
  creator: IUser;
  startDateTime: Date;
  endDateTime: Date;
  meetingLink: string;
  topics: string[];
  tags: string[];
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
};
