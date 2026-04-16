import { userRoleTypes } from "@/constants/userRoles";
import { Types } from "mongoose";

export type IRole = {
  name: userRoleTypes;
  permissions: string[];
};

export type IGetRole = {
  id: Types.ObjectId;
  name: userRoleTypes;
  permissions: string[];
};
