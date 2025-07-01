import PublishedCourses from "@/components/publishedCourses";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const PublishedCoursesPage = () => {
  return (
    <>
      <PageMetadata
        title="Published Courses - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <PublishedCourses />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(PublishedCoursesPage, ["admin"])
);
