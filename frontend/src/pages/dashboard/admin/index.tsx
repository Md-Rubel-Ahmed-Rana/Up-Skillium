import AdminDashboard from "@/components/dashboard/admin";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const AdminDashboardPage = () => {
  return (
    <>
      <PageMetadata
        title="Dashboard - Admin - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <AdminDashboard />
    </>
  );
};

AdminDashboardPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default AdminDashboardPage;
