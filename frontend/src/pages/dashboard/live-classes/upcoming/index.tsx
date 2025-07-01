import { UpcomingClasses } from "@/components/adminLiveClasses";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const UpcomingClassesPage = () => {
  return (
    <>
      <PageMetadata
        title="Upcoming Live Classes - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <UpcomingClasses />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(UpcomingClassesPage, ["admin"])
);
