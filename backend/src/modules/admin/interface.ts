import { Types } from "mongoose";

export type IAdmin = {
  user: Types.ObjectId;
  adminId: string;
  qualifications: string[];
};
