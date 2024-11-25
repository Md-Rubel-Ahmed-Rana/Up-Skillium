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
  status: string;
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
