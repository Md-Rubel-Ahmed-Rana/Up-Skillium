import CreateLesson from "@/components/createLesson";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const CreateLessonPage = () => {
  return (
    <>
      <PageMetadata
        title="Create Lesson - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CreateLesson />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(CreateLessonPage, ["admin", "instructor"])
);
