import CreateCertificate from "@/components/createCertificate";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const CreateCertificatePage = () => {
  return (
    <>
      <PageMetadata
        title="Create Certificate - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CreateCertificate />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(CreateCertificatePage, ["admin", "instructor"])
);
