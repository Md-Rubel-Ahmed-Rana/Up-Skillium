import { Types } from "mongoose";

export type ICertificate = {
  user: Types.ObjectId;
  course: Types.ObjectId;
  certificateUrl: string;
  studentName: string;
  courseName: string;
  technologies: string[];
  score: number;
};
