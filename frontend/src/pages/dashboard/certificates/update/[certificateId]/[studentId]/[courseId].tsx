import CertificateUpdate from "@/components/certificateUpdate";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const CertificateUpdatePage = () => {
  const { query } = useRouter();
  const studentName = query?.studentName as string;
  const courseName = query?.courseName as string;
  return (
    <>
      <PageMetadata
        title={`Edit Certificate - ${studentName || "Student name"} - ${
          courseName || "Course name"
        }`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CertificateUpdate />
    </>
  );
};

CertificateUpdatePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(CertificateUpdatePage);
