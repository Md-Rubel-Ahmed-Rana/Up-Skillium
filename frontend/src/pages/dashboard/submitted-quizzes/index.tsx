import SubmittedQuizzes from "@/components/submittedQuizzes";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const SubmittedQuizzesPage = () => {
  return (
    <>
      <PageMetadata
        title={`Submitted Quizzes - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <SubmittedQuizzes />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(SubmittedQuizzesPage, ["admin"])
);
