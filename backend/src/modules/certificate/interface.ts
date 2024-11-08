import { Types } from "mongoose";
import { IPdfCertificate } from "../pdf-creator/interface";

export type ICertificate = {
  certificatePdfData: IPdfCertificate;
  schema: ICertificateSchema;
};

export type ICertificateSchema = {
  userId: Types.ObjectId;
  course: Types.ObjectId;
  certificateUrl: string;
};

export type IGetCertificate = {
  user: Types.ObjectId;
  studentId: string;
  course: Types.ObjectId;
  certificateUrl: string;
};