import { Types } from "mongoose";

export type IModuleOutline = {
  name: string;
};

export interface ICourseOutline {
  courseId: Types.ObjectId;
  description: string;
  modules: IModuleOutline[];
}
