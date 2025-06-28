import CertificateAnalytics from "@/components/dashboardAnalytics/CertificateAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CertificateAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Certificates Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CertificateAnalytics />
    </>
  );
};

CertificateAnalyticsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default CertificateAnalyticsPage;
