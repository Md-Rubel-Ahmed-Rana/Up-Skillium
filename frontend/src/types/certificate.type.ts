type User = {
  id: string;
  name: string;
  email: string;
  image: string;
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
