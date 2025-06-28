import AssignmentSubmissionAnalytics from "@/components/dashboardAnalytics/AssignmentSubmissionAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const AssignmentSubmissionAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Assignments Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <AssignmentSubmissionAnalytics />
    </>
  );
};

AssignmentSubmissionAnalyticsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default AssignmentSubmissionAnalyticsPage;
