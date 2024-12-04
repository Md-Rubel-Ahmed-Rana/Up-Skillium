import CreateAdmin from "@/components/createAdmin";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CreateAdminPage = () => {
  return (
    <>
      <PageMetadata
        title="Create Admin - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CreateAdmin />
    </>
  );
};

CreateAdminPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default CreateAdminPage;
