import { useGetAllReviewsQuery } from "@/features/review";
import { IReview } from "@/types/review.type";

import FeedbackReviewsTable from "./FeedbackReviewsTable";

const FeedbackReviews = () => {
  const { data, isLoading } = useGetAllReviewsQuery({});
  const feedbacks = data?.data as IReview[];

  return (
    <div className="overflow-x-auto p-2 mt-3">
      <h1 className="text-lg lg:text-2xl font-semibold mb-4">
        Feedbacks & Reviews
      </h1>
      <FeedbackReviewsTable feedbacks={feedbacks} isLoading={isLoading} />
    </div>
  );
};

export default FeedbackReviews;
