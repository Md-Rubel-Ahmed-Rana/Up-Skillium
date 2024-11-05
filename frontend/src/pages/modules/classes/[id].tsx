import ModulesClasses from "@/components/modules";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const StudentModulesPage = () => {
  return (
    <>
      <PageMetadata
        title="Modules - Classes - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ModulesClasses />
    </>
  );
};

StudentModulesPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default StudentModulesPage;
