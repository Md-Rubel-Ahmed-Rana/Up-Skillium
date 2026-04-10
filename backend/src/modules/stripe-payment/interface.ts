import { Types } from "mongoose";

export type IStripeCheckout = {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  courseName: string;
  price: number;
  quantity: number;
};
