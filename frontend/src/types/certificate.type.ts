type User = {
  name: string;
  email: string;
  image: string;
  id: string;
};

type Course = {
  title: string;
  category: string;
  image: string;
  id: string;
};

export type ICertificate = {
  course: Course;
  certificateUrl: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  id: string;
};

export type ICreateCertificate = {
  certificatePdfData: {
    studentName: string;
    courseName: string;
    technologies: string[];
    score: number;
  };
  schema: {
    user: string;
    course: string;
  };
};
