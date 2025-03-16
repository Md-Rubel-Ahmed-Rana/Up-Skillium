import InstructorFeedbackReviews from "@/components/instructorReviews";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorFeedbackReviewsPage = () => {
  return (
    <>
      <PageMetadata
        title="Instructor: Feedback & Reviews - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorFeedbackReviews />
    </>
  );
};

InstructorFeedbackReviewsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(InstructorFeedbackReviewsPage);
