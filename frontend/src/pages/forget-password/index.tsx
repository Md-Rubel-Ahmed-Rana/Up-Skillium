import ForgetPassword from "@/components/forgetPassword";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ForgetPasswordPage = () => {
  return (
    <>
      <PageMetadata
        title="Forget password - Up Skillium"
        description="this is up skillium login page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ForgetPassword />
    </>
  );
};

ForgetPasswordPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ForgetPasswordPage;
