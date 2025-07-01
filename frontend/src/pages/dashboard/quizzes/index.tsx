import InstructorQuizzes from "@/components/instructorQuizzes";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ManageQuizzesPage = () => {
  return (
    <>
      <PageMetadata
        title="Quizzes - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <InstructorQuizzes />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(ManageQuizzesPage, ["instructor"])
);
