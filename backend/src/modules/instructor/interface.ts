import { Types } from "mongoose";

export type IInstructor = {
  user: Types.ObjectId;
  teacherId: string;
  qualifications: string[];
  courses: Types.ObjectId[];
  ratings: {
    averageRating: number;
    totalReviews: number;
  };
};
