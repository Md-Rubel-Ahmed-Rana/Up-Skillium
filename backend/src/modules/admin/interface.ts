import { Types } from "mongoose";
import { ICreateUser } from "../user/user.interface";

export type IAdmin = {
  userId: Types.ObjectId;
  bio: string;
  user: ICreateUser;
  role: string;
  adminId: string;
  qualifications: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
};
