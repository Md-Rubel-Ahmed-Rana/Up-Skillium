import { Types } from "mongoose";

export type IModuleOutline = {
  id: Types.ObjectId;
  name: string;
  serial: number;
};

export interface ICourseOutline {
  course: Types.ObjectId;
  modules: IModuleOutline[];
}

export type IModuleSerialUpdate = {
  sourceObject: {
    serialNumber: number;
    moduleId: Types.ObjectId;
  };
  destinationObject: {
    serialNumber: number;
    moduleId: Types.ObjectId;
  };
};
