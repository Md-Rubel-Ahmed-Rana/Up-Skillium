import ManageEducations from "@/components/manageEducations";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ManageEducationsPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Educations - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <ManageEducations />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(ManageEducationsPage, ["admin"])
);
