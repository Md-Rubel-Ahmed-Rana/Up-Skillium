import StudentCertificates from "@/components/studentCertificates";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import dynamic from "next/dynamic";
const DashboardLayout = dynamic(import("@/layout/DashboardLayout"), {
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
      <DashboardLayout>
        <StudentCertificates />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(StudentCertificatesPage, ["student"])
);
