import { Types } from "mongoose";
import { ILesson } from "../lesson/interface";

export type IModule = {
  id?: Types.ObjectId;
  _id?: Types.ObjectId;
  course: Types.ObjectId;
  title: string;
  lessons: ILesson[];
  duration?: number;
  serial: number;
};

export type IGetModulesWithLessons = {
  module: IModule;
  lessons: ILesson[];
};
