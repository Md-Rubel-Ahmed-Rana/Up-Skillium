import { Types } from "mongoose";
import { IPdfCertificate } from "../pdf-creator/interface";
import { IUser } from "../user/interface";
import { ICourse } from "../course/interface";

export type ICertificate = {
  certificatePdfData: IPdfCertificate;
  schema: ICertificateSchema;
};

export type ICertificateSchema = {
  user: Types.ObjectId;
  studentId: string;
  course: Types.ObjectId;
  certificateUrl: string;
};

export type IGetCertificate = {
  user: Types.ObjectId;
  studentId: string;
  course: Types.ObjectId;
  certificateUrl: string;
};
