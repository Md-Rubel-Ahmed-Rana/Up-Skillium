import { IUser } from "./user.type";

type IInstructor = {
  name: string;
  image: string;
  bio: string;
};

export type ICourse = {
  price: {
    original: number;
    discount: number;
    salePrice: number;
  };
  ratings: {
    averageRating: number;
    ratingCount: number;
  };
  title: string;
  description: string;
  image: string;
  tags: string[];
  technologies: string[];
  category: string;
  level: string;
  duration: string;
  instructor: IInstructor;
  students: IUser[];
  reviews: IUser[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};
