import { Types } from "mongoose";

export type IEnrollment = {
  user: Types.ObjectId;
  course: Types.ObjectId;
  courseName: string;
  price: number;
  status?: "success" | "failed";
  paymentSessionId: string;
  paymentSessionUrl: string;
};
