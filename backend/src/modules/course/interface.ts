import { Types } from "mongoose";

export type ICourse = {
  title: string;
  description: string;
  price: {
    original: number;
    discount: number;
    salePrice: number;
  };
  tags: string[]; // "hot", "new", "best sale", "popular"
  category: string; // e.g., Web Design, Web Development, Graphic Design, etc.
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
