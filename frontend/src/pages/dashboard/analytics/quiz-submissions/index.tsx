import QuizSubmissionAnalytics from "@/components/dashboardAnalytics/QuizSubmissionAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const QuizSubmissionAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Quiz Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <QuizSubmissionAnalytics />
    </>
  );
};

QuizSubmissionAnalyticsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default QuizSubmissionAnalyticsPage;
