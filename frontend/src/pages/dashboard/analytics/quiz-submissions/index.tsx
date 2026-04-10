import QuizSubmissionAnalytics from "@/components/dashboardAnalytics/QuizSubmissionAnalytics";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const QuizSubmissionAnalyticsPage = () => {
  return (
    <>
      <PageMetadata
        title={`Quiz Analytics - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <QuizSubmissionAnalytics />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(QuizSubmissionAnalyticsPage, ["admin"])
);
