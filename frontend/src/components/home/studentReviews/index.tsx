import ReviewHeader from "./ReviewHeader";
import StudentReviewContainer from "./StudentReviewContainer";

const StudentReviews = () => {
  return (
    <div className="flex flex-col gap-6 border-t border-gray-400 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-2">
      <ReviewHeader />
      <StudentReviewContainer />
    </div>
  );
};

export default StudentReviews;
