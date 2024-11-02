import Login from "@/components/login";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const LoginPage = () => {
  return (
    <>
      <PageMetadata
        title="Login - Up Skillium"
        description="this is up skillium login page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <div className="min-h-screen pt-20">
        <Login />
      </div>
    </>
  );
};

LoginPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default LoginPage;
