import { Types } from "mongoose";

export type IEnrollment = {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  courseName: string;
  price: number;
  status?: "success" | "failed";
  paymentSessionId: string;
  paymentSessionUrl: string;
};