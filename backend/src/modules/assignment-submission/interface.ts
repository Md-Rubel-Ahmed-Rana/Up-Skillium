import { Types } from "mongoose";

export type IAssignmentSubmission = {
  user: Types.ObjectId;
  lesson: Types.ObjectId;
  status: "pending" | "checked";
  fullMark: number;
  yourMark: number;
  submission: ISubmission;
  submittedAt: Date;
  checkedAt?: Date;
  feedback?: string;
  isLate?: boolean;
  dueDate?: Date;
};

type ISubmission = {
  content: string;
  file: string;
};
