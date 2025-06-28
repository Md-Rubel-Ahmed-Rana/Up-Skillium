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

export type IEnrollmentAnalytics = {
  totalEnrollments: number;
  totalRevenue: number;
  successCount: number;
  failedCount: number;
  enrollmentsByDate: {
    date: string;
    count: number;
    revenue: number;
  }[];
};
