import { IUser } from "./user.type";

export type ISubmission = {
  content: string;
  file: string;
  id: string;
};

export type IAssignmentSubmission = {
  id: string;
  user: IUser;
  lesson: {
    id: string;
    title: string;
  };
  status: "checked" | "pending";
  fullMark: number;
  yourMark: number;
  submission: ISubmission;
  submittedAt: Date;
  checkedAt: Date;
  feedback: string;
  isLate: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type IReviewAssignment = {
  id: string;
  user: string;
  lesson: string;
  status: "checked" | "pending";
  fullMark: number;
  yourMark: number;
  submission: ISubmission;
  submittedAt: Date;
  checkedAt: Date;
  feedback: string;
  isLate: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};
