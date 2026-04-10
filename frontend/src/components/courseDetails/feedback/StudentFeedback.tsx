import { ICourse } from "@/types/course.type";
import { Card, Divider } from "antd/lib";
import FeedbackModal from "./FeedbackModal";
import RatingCard from "./RatingCard";
import ReviewsList from "./ReviewsList";

type Props = {
  course: ICourse;
};

const StudentFeedback = ({ course }: Props) => {
  return (
    <Card bordered={false} className="rounded-lg space-y-4">
      <Divider>Student Feedback</Divider>
      <RatingCard
        ratings={{
          averageRating: course?.ratings?.averageRating || 0,
          totalReviews: course?.ratings?.totalReviews || 0,
        }}
      />
      <FeedbackModal />
      <ReviewsList courseId={course?.id} />
    </Card>
  );
};

export default StudentFeedback;
