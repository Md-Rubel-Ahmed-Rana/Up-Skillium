import CreateCertificate from "@/components/createCertificate";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CreateCertificatePage = () => {
  return (
    <>
      <PageMetadata
        title="Create Certificate - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CreateCertificate />
    </>
  );
};

export default CreateCertificatePage;

CreateCertificatePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
