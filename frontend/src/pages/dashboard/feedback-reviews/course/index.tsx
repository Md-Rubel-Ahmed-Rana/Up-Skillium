import CourseFeedbackReviews from "@/components/courseReviews";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
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

CourseFeedbackReviewsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(CourseFeedbackReviewsPage);
