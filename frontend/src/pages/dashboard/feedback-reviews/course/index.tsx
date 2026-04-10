import CourseFeedbackReviews from "@/components/courseReviews";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const CourseFeedbackReviewsPage = () => {
  return (
    <>
      <PageMetadata
        title="Course: Feedback & Reviews - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CourseFeedbackReviews />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(CourseFeedbackReviewsPage, ["admin"])
);
