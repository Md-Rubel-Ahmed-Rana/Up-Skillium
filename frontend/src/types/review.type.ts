type IReviewer = {
  id: string;
  name: string;
  image: string;
};

export type IReviewToInstructor = {
  id: string;
  name: string;
  image: string;
};

export type IReviewToCourse = {
  id: string;
  title: string;
  image: string;
};

export type IReviewTo = IReviewToInstructor | IReviewToCourse;

export type IReview = {
  id: string;
  feedback: string;
  reviewToModel: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  reviewer: IReviewer;
  reviewTo: IReviewTo;
};

export type IAddReview = {
  feedback: string;
  reviewToModel: "User" | "Course";
  rating: number;
  reviewer: string;
  reviewTo: string;
};
