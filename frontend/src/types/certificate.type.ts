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
  technologies: string[];
  id: string;
};

export type ICertificate = {
  course: Course;
  certificateUrl: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  id: string;
  studentName: string;
  courseName: string;
  technologies: string[];
  score: number;
};

export type IUpdateCertificate = {
  studentName: string;
  courseName: string;
  technologies: string[];
  score: number;
};
export type ICreateCertificate = {
  user: string;
  course: string;
  studentName: string;
  courseName: string;
  technologies: string[];
  score: number;
};
