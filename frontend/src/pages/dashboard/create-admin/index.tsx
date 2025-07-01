import CreateAdmin from "@/components/createAdmin";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const CreateAdminPage = () => {
  return (
    <>
      <PageMetadata
        title="Create Admin - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CreateAdmin />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(CreateAdminPage, ["admin"]));
