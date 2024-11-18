import PasswordChange from "@/components/passwordChange";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const PasswordChangePage = () => {
  return (
    <>
      <PageMetadata
        title="Change Password - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <PasswordChange />
    </>
  );
};

export default PasswordChangePage;

PasswordChangePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
