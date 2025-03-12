import { Types } from "mongoose";

export type IEnrollment = {
  user: Types.ObjectId;
  course: Types.ObjectId;
  courseName: string;
  price: number;
  orderId?: string;
  status?: "success" | "failed";
  paymentSessionId: string;
  paymentSessionUrl: string;
};
