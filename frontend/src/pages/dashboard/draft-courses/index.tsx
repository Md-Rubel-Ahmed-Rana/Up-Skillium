import DraftCourses from "@/components/draftCourses";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const DraftCoursesPage = () => {
  return (
    <>
      <PageMetadata
        title="Draft Courses - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <DraftCourses />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(DraftCoursesPage, ["admin"]));
