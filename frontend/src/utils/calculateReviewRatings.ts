import { IReview } from "@/types/review.type";

const calculateReviewRatings = (reviews: IReview[] = []): number => {
  let totalRatings = 0;

  reviews?.forEach((review) => {
    totalRatings += review?.rating;
  });
  const averageRating = totalRatings / reviews?.length;

  return averageRating;
};

export default calculateReviewRatings;
