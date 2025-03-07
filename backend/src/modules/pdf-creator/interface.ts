export type IPdfCertificate = {
  studentName: string;
  courseName: string;
  technologies: string[];
  score: number;
};

export type IPdfInvoice = {
  orderInfo: OrderInfo;
  customerInfo: CustomerInfo;
  courseInfo: CourseInfo;
};

type OrderInfo = {
  orderId: string;
  orderDate: Date;
};

export type CustomerInfo = {
  name: string;
  email: string;
  studentId: string;
};

export type CourseInfo = {
  name: string;
  price: number;
  discount: number;
};
