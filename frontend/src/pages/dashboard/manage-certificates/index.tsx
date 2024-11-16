import ManageCertificates from "@/components/manageCertificates";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ManageCertificatesPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Certificates - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ManageCertificates />
    </>
  );
};

export default ManageCertificatesPage;

ManageCertificatesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
