import ManageLessons from "@/components/manageLessons";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ManageLessonsPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Lessons - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <ManageLessons />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(ManageLessonsPage, ["admin"]));
