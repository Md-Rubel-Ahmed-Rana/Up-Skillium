import EnrollmentAnalytics from "@/components/dashboardAnalytics/EnrollmentAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const EnrollmentAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Enrollments Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <EnrollmentAnalytics />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(EnrollmentAnalyticsPage, ["admin"])
);
