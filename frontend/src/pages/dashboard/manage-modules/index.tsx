import ManageModules from "@/components/manageModules";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ManageModulesPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Modules - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <ManageModules />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(ManageModulesPage, ["admin"]));
