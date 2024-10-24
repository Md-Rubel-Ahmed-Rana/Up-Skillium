import { Types } from "mongoose";
import { ICreateUser } from "../user/user.interface";

export type IInstructor = {
  userId: Types.ObjectId;
  bio: string;
  user: ICreateUser;
  role: string;
  teacherId: string;
  qualifications: string[];
  courses: Types.ObjectId[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  ratings: {
    averageRating: number;
    totalReviews: number;
  };
};
