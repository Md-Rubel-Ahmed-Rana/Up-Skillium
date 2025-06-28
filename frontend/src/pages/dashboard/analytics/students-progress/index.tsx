import StudentProgressAnalytics from "@/components/dashboardAnalytics/StudentProgressAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const StudentProgressAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Students Progress Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <StudentProgressAnalytics />
    </>
  );
};

StudentProgressAnalyticsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default StudentProgressAnalyticsPage;
