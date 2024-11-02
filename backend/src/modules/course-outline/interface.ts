import { Types } from "mongoose";

export type IModuleOutline = {
  name: string;
};

export interface ICourseOutline {
  course: Types.ObjectId;
  modules: IModuleOutline[];
}
