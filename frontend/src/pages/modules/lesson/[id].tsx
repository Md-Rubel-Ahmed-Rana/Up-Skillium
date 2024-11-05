import ModulesClasses from "@/components/modules";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const StudentLessonPage = () => {
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

StudentLessonPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default StudentLessonPage;
