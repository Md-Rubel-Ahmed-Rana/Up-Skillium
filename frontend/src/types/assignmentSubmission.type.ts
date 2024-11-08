export type ISubmission = {
  content: string;
  file: string;
  id: string;
};

export type IAssignmentSubmission = {
  id?: string;
  userId: string;
  lessonId: string;
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
