import ReviewHeader from "./ReviewHeader";
import StudentReviewContainer from "./StudentReviewContainer";

const StudentReviews = () => {
  return (
    <div className="flex flex-col gap-6 py-20 px-2">
      <ReviewHeader />
      <StudentReviewContainer />
    </div>
  );
};

export default StudentReviews;
