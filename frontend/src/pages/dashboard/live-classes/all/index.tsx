import { AllLiveClasses } from "@/components/adminLiveClasses";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const AllLiveClassesPage = () => {
  return (
    <>
      <PageMetadata
        title="Live Classes - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <AllLiveClasses />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(AllLiveClassesPage, ["admin"])
);
