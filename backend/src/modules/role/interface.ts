import { Types } from "mongoose";

export type IRole = {
  role: string;
  permissions: string[];
};

export type IGetRole = {
  id: Types.ObjectId;
  role: string;
  permissions: string[];
};
