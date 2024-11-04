import { Types } from "mongoose";

export type ICourse = {
  title: string;
  description: string;
  image: string;
  price: {
    original: number;
    discount: number;
    salePrice: number;
  };
  tags: string[];
  technologies: string[];
  category: string;
  introductoryVideo: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  instructor?: Types.ObjectId;
  students?: Types.ObjectId[];
  ratings?: {
    averageRating: number;
    ratingCount: number;
  };
  reviews?: Types.ObjectId[];
  status?: "draft" | "published" | "archived";
};