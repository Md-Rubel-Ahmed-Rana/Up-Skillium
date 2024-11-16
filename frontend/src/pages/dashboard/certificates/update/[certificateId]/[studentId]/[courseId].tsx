import CertificateUpdate from "@/components/certificateUpdate";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
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

export default CertificateUpdatePage;

CertificateUpdatePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
