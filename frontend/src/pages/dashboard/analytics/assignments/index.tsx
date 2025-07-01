import AssignmentSubmissionAnalytics from "@/components/dashboardAnalytics/AssignmentSubmissionAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const AssignmentSubmissionAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Assignments Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <AssignmentSubmissionAnalytics />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(AssignmentSubmissionAnalyticsPage, ["admin"])
);
