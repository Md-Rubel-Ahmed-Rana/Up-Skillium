import { Types } from "mongoose";

export type IReview = {
  reviewer: Types.ObjectId;
  reviewTo: Types.ObjectId;
  rating: number;
  feedback: string;
};
