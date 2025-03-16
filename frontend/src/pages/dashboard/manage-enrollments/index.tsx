import ManageEnrollments from "@/components/manageEnrollments";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ManageEnrollmentsPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Enrollments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ManageEnrollments />
    </>
  );
};

ManageEnrollmentsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(ManageEnrollmentsPage);
