import ResetPassword from "@/components/resetPassword";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ResetPasswordPage = () => {
  return (
    <>
      <PageMetadata
        title="Reset Password - Up Skillium"
        description="this is up skillium login page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ResetPassword />
    </>
  );
};

ResetPasswordPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ResetPasswordPage;
