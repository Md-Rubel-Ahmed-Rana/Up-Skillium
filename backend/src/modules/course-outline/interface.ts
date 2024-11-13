import { Types } from "mongoose";

export type IModuleOutline = {
  name: string;
  serial: number;
};

export interface ICourseOutline {
  course: Types.ObjectId;
  modules: IModuleOutline[];
}
