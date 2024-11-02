import AdminDashboard from "@/components/dashboard/admin";
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
      <div className="min-h-screen pt-20">
        <AdminDashboard />
      </div>
    </>
  );
};

AdminDashboardPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminDashboardPage;
