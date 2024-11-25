import { useGetAllReviewsByReviewToQuery } from "@/features/review";
import { ICourse } from "@/types/course.type";
import { IReview } from "@/types/review.type";
import calculateReviewRatings from "@/utils/calculateReviewRatings";
import { Card, Divider } from "antd/lib";
import FeedbackModal from "../feedback/FeedbackModal";
import RatingCard from "./RatingCard";
import ReviewsList from "./ReviewsList";

type Props = {
  course: ICourse;
};

const StudentFeedback = ({ course }: Props) => {
  const { data, isLoading } = useGetAllReviewsByReviewToQuery({
    reviewToId: course?.id,
  });
  const reviews = data?.data as IReview[];
  const ratings = calculateReviewRatings(reviews) || 0;

  return (
    <Card bordered={false} className="rounded-lg space-y-4">
      <Divider>Student Feedback</Divider>
      <RatingCard
        ratings={{ averageRating: ratings, ratingCount: reviews?.length }}
      />
      <FeedbackModal />
      <ReviewsList reviews={reviews} isLoading={isLoading} />
    </Card>
  );
};

export default StudentFeedback;
