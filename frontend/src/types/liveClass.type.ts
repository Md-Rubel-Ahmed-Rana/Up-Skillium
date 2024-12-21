import { IUser } from "./user.type";

export type ICreateLiveClass = {
  title: string;
  description: string;
  instructor: string;
  course: string;
  creator: string;
  startDateTime: string;
  endDateTime: string;
  duration: number;
  meetingLink: string;
  topics?: string[];
  tags?: string[];
};

export type IGetLiveClass = {
  id: string;
  title: string;
  description: string;
  instructor: IUser;
  course: IUser;
  creator: IUser;
  startDateTime: Date;
  endDateTime: Date;
  duration: number;
  meetingLink: string;
  topics: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};
