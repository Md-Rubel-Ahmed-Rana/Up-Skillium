import UserAnalyticsSummary from "@/components/dashboardAnalytics/UserAnalyticsSummary";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const UserAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Users Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <UserAnalyticsSummary />
    </>
  );
};

UserAnalyticsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(AuthorizationGuard(UserAnalyticsPage, "admin"));
