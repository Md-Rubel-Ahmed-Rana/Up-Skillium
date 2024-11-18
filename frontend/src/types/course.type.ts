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

export type IMyCourse = {
  id: string;
  title: string;
  image: string;
};

export type ICourseBasicInfo = {
  title: string;
  category: string;
  level: string;
  status: string;
  duration: string;
  description: string;
};

export type IPriceUpdate = {
  original: number;
  discount: number;
  salePrice: number;
};
export type ICourseTagsTechsUpdate = {
  tags: string[];
  technologies: string[];
};

export type ICreateCourse = {
  title: string;
  description: string;
  image: File;
  price: {
    original: number;
    discount: number;
    salePrice: number;
  };
  tags: string[];
  technologies: string[];
  category: string;
  introductoryVideo: File;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  status: "draft" | "published" | "archived";
  [key: string]: any;
};
