import { Types } from "mongoose";
import { userRoleTypes } from "../../constants/userRoles";

export type IRole = {
  name: userRoleTypes;
  permissions: string[];
};

export type IGetRole = {
  id: Types.ObjectId;
  name: userRoleTypes;
  permissions: string[];
};
