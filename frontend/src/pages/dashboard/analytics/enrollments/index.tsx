import EnrollmentAnalytics from "@/components/dashboardAnalytics/EnrollmentAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const EnrollmentAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Enrollments Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <EnrollmentAnalytics />
    </>
  );
};

EnrollmentAnalyticsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(
  AuthorizationGuard(EnrollmentAnalyticsPage, "admin")
);
