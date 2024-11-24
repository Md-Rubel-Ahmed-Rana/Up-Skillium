import { ICourse } from "@/types/course.type";
import { Card, Divider } from "antd/lib";
import FeedbackModal from "../feedback/FeedbackModal";
import RatingCard from "./RatingCard";
import ReviewsList from "./ReviewsList";

type Props = {
  course: ICourse;
};

const StudentFeedback = ({ course }: Props) => {
  return (
    <Card bordered={false} className="rounded-lg space-y-4">
      <Divider>Student Feedback</Divider>
      <FeedbackModal />
      <RatingCard ratings={course?.ratings} />
      <ReviewsList reviews={course?.reviews} />
    </Card>
  );
};

export default StudentFeedback;
