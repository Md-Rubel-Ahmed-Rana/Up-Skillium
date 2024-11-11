export type IEnrollmentOrder = {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  price: number;
  status: "success" | "failed";
  paymentSessionId: string;
  paymentSessionUrl: string;
  createdAt: Date;
  updatedAt: Date;
};
