import Alumni from "@/components/alumni";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const AlumniPage = () => {
  return (
    <>
      <PageMetadata
        title="Alumni - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <Alumni />
    </>
  );
};

export default AlumniPage;

AlumniPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
