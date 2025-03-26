export type ILiveClassMail = {
  title: string;
  instructor: {
    name: string;
    email: string;
  };
  courseName: string;
  students: {
    name: string;
    email: string;
  }[];
  startDateTime: Date;
  duration: number;
  meetingLink: string;
  topics: string[];
};

export type IAssignmentMarkedMail = {
  assignmentTitle: string;
  student: {
    name: string;
    email: string;
  };
  marks: number;
  totalMarks: number;
};
