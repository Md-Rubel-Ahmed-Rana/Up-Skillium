import Analytics from "@/components/dashboardAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const AnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Users Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <Analytics />
    </>
  );
};

AnalyticsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default AnalyticsPage;
