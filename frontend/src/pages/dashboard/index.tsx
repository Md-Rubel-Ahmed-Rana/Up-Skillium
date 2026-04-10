import Analytics from "@/components/dashboardAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const AnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <Analytics />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(AnalyticsPage, ["admin"]));
