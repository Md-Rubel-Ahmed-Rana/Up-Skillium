import CertificateAnalytics from "@/components/dashboardAnalytics/CertificateAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const CertificateAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Certificates Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CertificateAnalytics />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(CertificateAnalyticsPage, ["admin"])
);
