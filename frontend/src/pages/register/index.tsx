import Register from "@/components/register";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const RegisterPage = () => {
  return (
    <>
      <PageMetadata
        title="Create account - Up Skillium"
        description="this is up skillium register signup page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <div className="min-h-screen pt-20">
        <Register />
      </div>
    </>
  );
};

RegisterPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default RegisterPage;
