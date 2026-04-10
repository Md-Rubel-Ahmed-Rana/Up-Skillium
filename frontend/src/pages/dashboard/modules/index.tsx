import InstructorModules from "@/components/instructorModules";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ModulesPage = () => {
  return (
    <>
      <PageMetadata
        title="Modules - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <InstructorModules />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(ModulesPage, ["instructor"]));
