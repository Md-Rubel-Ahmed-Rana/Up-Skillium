import CreateQuizLesson from "@/components/createQuiz";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const CreateQuizLessonPage = () => {
  return (
    <>
      <PageMetadata
        title="Create Quiz - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CreateQuizLesson />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(CreateQuizLessonPage, ["admin", "instructor"])
);
