import { IUser } from "./user.type";

export type IInstructor = {
  name: string;
  image: string;
  bio: string;
};

export type IReview = {
  review: string;
  reviewer: IUser;
};

export type ICourse = {
  id: string;
  title: string;
  description: string;
  price: {
    original: number;
    discount: number;
    salePrice: number;
  };
  image: string;
  tags: string[];
  technologies: string[];
  category: string;
  introductoryVideo: string;
  level: string;
  duration: string;
  instructor: IInstructor;
  students: IUser[];
  reviews: IReview[];
  status: string;
  ratings: {
    averageRating: number;
    ratingCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
};