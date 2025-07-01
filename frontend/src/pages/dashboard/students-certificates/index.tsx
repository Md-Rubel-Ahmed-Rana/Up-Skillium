import InstructorCertificates from "@/components/instructorCertificates";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const InstructorCertificatesPage = () => {
  return (
    <>
      <PageMetadata
        title="Students Certificates - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <InstructorCertificates />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(InstructorCertificatesPage, ["instructor"])
);
