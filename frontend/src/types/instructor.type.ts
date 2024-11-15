type ICourse = {
  id: string;
  title: string;
  category: string;
  image: string;
};

type IRatings = {
  averageRating: number;
  totalReviews: number;
};

type IUser = {
  id: string;
  name: string;
  email: string;
};

export type IInstructor = {
  id: string;
  user: IUser;
  ratings: IRatings;
  teacherId: string;
  courses: ICourse[];
  createdAt: string;
  updatedAt: string;
};
