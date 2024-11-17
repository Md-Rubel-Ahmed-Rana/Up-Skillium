import { Types } from "mongoose";

export type IRole = {
  name: string;
  permissions: string[];
};

export type IGetRole = {
  id: Types.ObjectId;
  name: string;
  permissions: string[];
};
