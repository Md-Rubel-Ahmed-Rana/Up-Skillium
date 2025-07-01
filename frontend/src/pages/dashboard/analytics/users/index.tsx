import UserAnalyticsSummary from "@/components/dashboardAnalytics/UserAnalyticsSummary";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const UserAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Users Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <UserAnalyticsSummary />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(UserAnalyticsPage, ["admin"]));
