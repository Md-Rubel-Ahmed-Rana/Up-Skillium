import DashboardRenderer from "@/components/dashboard";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const DashboardPage = () => {
  return (
    <>
      <PageMetadata
        title="Dashboard - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardRenderer />
    </>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
