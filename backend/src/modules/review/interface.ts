import { Types } from "mongoose";

export type IReview = {
  reviewer: Types.ObjectId;
  reviewTo: Types.ObjectId;
  reviewToModel: "User" | "Course";
  rating: number;
  feedback: string;
};
