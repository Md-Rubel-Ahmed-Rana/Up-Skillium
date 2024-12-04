import FeedbackReviews from "@/components/feedbackReviews";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const FeedbackReviewsPage = () => {
  return (
    <>
      <PageMetadata
        title="Feedback & Reviews - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <FeedbackReviews />
    </>
  );
};

export default FeedbackReviewsPage;

FeedbackReviewsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
