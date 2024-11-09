import StudentCertificates from "@/components/dashboard/certificates";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const StudentCertificatesPage = () => {
  return (
    <>
      <PageMetadata
        title="My Certificates - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <StudentCertificates />
    </>
  );
};

export default StudentCertificatesPage;

StudentCertificatesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
