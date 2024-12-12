import { IUser } from "./user.type";

export type IEnrollment = {
  id: string;
  user: IUser;
  course: {
    id: string;
    title: string;
    image: string;
  };
  courseName: string;
  price: number;
  status: "success" | "failed";
  paymentSessionId: string;
  paymentSessionUrl: string;
  createdAt: Date;
  updatedAt: Date;
};
