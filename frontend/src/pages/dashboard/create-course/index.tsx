import CreateCourse from "@/components/createCourse";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const CreateCoursePage = () => {
  return (
    <>
      <PageMetadata
        title="Create Course - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CreateCourse />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(CreateCoursePage, ["admin"]));
