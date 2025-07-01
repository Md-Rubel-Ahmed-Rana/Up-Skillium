import { PreviousClasses } from "@/components/adminLiveClasses";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const PreviousClassesPage = () => {
  return (
    <>
      <PageMetadata
        title="Previous Live Classes - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <PreviousClasses />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(PreviousClassesPage, ["admin"])
);
