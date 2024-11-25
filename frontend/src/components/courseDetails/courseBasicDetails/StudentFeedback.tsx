import { useGetAllReviewsByReviewToQuery } from "@/features/review";
import { ICourse } from "@/types/course.type";
import { IReview } from "@/types/review.type";
import { Card, Divider } from "antd/lib";
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
  return (
    <Card bordered={false} className="rounded-lg space-y-4">
      <Divider>Student Feedback</Divider>
      <RatingCard ratings={course?.ratings} />
      <ReviewsList reviews={reviews} isLoading={isLoading} />
    </Card>
  );
};

export default StudentFeedback;
