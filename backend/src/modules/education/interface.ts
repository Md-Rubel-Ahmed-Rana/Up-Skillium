import { Types } from "mongoose";

export type IEducation = {
  userId: Types.ObjectId;
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
};
