import { Types } from "mongoose";
import { ILesson } from "../lesson/interface";

export type IModule = {
  id?: Types.ObjectId;
  course: Types.ObjectId;
  title: string;
  lessons: ILesson[];
  duration?: number;
  serial: number;
};
