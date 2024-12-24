import CourseFeedbackReviews from "@/components/courseReviews";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CourseFeedbackReviewsPage = () => {
  return (
    <>
      <PageMetadata
        title="Course: Feedback & Reviews - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CourseFeedbackReviews />
    </>
  );
};

export default CourseFeedbackReviewsPage;

CourseFeedbackReviewsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};