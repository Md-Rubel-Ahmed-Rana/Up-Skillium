import ManageCertificates from "@/components/manageCertificates";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ManageCertificatesPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Certificates - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <ManageCertificates />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(ManageCertificatesPage, ["admin"])
);
