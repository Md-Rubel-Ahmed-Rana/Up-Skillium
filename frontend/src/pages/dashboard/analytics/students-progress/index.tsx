import StudentProgressAnalytics from "@/components/dashboardAnalytics/StudentProgressAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const StudentProgressAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Students Progress Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <StudentProgressAnalytics />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(StudentProgressAnalyticsPage, ["admin"])
);
