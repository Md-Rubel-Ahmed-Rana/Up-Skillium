import FeedbackReviews from "@/components/feedbackReviews";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const FeedbackReviewsPage = () => {
  return (
    <>
      <PageMetadata
        title="Feedback & Reviews - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <FeedbackReviews />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(FeedbackReviewsPage, ["admin"])
);
