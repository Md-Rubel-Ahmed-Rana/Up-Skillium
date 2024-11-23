import { Types } from "mongoose";

export type IEducation = {
  user: Types.ObjectId;
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  isCurrent: boolean;
  startDate: Date;
  endDate?: Date;
  description?: string;
};
