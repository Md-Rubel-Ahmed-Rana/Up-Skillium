import { Types } from "mongoose";
import { ILesson } from "../lesson/interface";

export type IModule = {
  courseId: Types.ObjectId;
  title: string;
  lessons: ILesson[];
  duration?: number;
  serial: number;
};
