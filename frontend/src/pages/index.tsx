import PageMetadata from "@/utils/PageMetadata";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";
import Home from "@/components/home";

const HomePage = () => {
  return (
    <>
      <PageMetadata
        title="Home - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <Home />
    </>
  );
};

HomePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default HomePage;
