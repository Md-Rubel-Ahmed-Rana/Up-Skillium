import ManageUsers from "@/components/manageUsers";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ManageUsersPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Users - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <ManageUsers />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(ManageUsersPage, ["admin"]));
