import InstructorCertificates from "@/components/instructorCertificates";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorCertificatesPage = () => {
  return (
    <>
      <PageMetadata
        title="Students Certificates - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorCertificates />
    </>
  );
};

InstructorCertificatesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(InstructorCertificatesPage);
