import ManageRoles from "@/components/manageRoles";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ManageRolesPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Roles - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ManageRoles />
    </>
  );
};

ManageRolesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(ManageRolesPage);
