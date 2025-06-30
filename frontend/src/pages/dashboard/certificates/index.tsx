import StudentCertificates from "@/components/studentCertificates";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import dynamic from "next/dynamic";
const TestDashboardLayout = dynamic(import("@/layout/TestDashboardLayout"), {
  ssr: false,
});

const StudentCertificatesPage = () => {
  return (
    <>
      <PageMetadata
        title="My Certificates - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <TestDashboardLayout>
        <StudentCertificates />
      </TestDashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(StudentCertificatesPage, "student")
);
