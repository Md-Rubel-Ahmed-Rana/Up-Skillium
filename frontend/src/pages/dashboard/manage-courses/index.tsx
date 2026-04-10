import ManageCourses from "@/components/manageCourses";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ManageCoursesPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Courses - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <ManageCourses />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(ManageCoursesPage, ["admin"]));
