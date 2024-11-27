import { Types } from "mongoose";
import { IReview } from "./interface";
import { Review } from "./model";
import { CourseService } from "../course/service";
import { InstructorService } from "../instructor/service";

class Service {
  async addReview(data: IReview): Promise<void> {
    await Review.create(data);
    if (data?.reviewToModel === "User") {
      await InstructorService.incrementRatings(data?.reviewTo, data?.rating);
    } else if (data?.reviewToModel === "Course") {
      await CourseService.incrementRatings(data?.reviewTo, data?.rating);
    } else {
      return;
    }
  }
  async getAllReviews(): Promise<IReview[]> {
    const reviews = await Review.find({}).populate([
      {
        path: "reviewer",
        model: "User",
        select: { name: 1, image: 1 },
      },
      {
        path: "reviewTo",
        select: { name: 1, image: 1, title: 1 },
      },
    ]);

    return reviews;
  }
  async getAllCourseReviews(): Promise<IReview[]> {
    const reviews = await Review.find({ reviewToModel: "Course" }).populate([
      {
        path: "reviewer",
        model: "User",
        select: { name: 1, image: 1 },
      },
      {
        path: "reviewTo",
        select: { name: 1, image: 1, title: 1 },
      },
    ]);

    return reviews;
  }
  async getAllInstructorReviews(): Promise<IReview[]> {
    const reviews = await Review.find({ reviewToModel: "User" }).populate([
      {
        path: "reviewer",
        model: "User",
        select: { name: 1, image: 1 },
      },
      {
        path: "reviewTo",
        select: { name: 1, image: 1, title: 1 },
      },
    ]);

    return reviews;
  }
  async getSingleReview(reviewId: Types.ObjectId): Promise<IReview | null> {
    return await Review.findById(reviewId).populate([
      {
        path: "reviewer",
        model: "User",
        select: { name: 1, image: 1 },
      },
      {
        path: "reviewTo",
        select: { name: 1, image: 1, title: 1 },
      },
    ]);
  }
  async getAllReviewByReviewTo(reviewToId: Types.ObjectId): Promise<IReview[]> {
    const reviews = await Review.find({ reviewTo: reviewToId }).populate([
      {
        path: "reviewer",
        model: "User",
        select: { name: 1, image: 1 },
      },
      {
        path: "reviewTo",
        select: { name: 1, image: 1, title: 1 },
      },
    ]);

    return reviews;
  }
  async updateReview(
    reviewId: Types.ObjectId,
    data: { rating: number; feedback: string }
  ): Promise<void> {
    await Review.findByIdAndUpdate(reviewId, {
      $set: { feedback: data?.feedback, rating: data?.rating },
    });
  }
  async deleteReview(reviewId: Types.ObjectId): Promise<void> {
    await Review.findByIdAndDelete(reviewId);
  }
}

export const ReviewService = new Service();
