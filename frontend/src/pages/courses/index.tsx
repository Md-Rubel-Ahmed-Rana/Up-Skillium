import Courses from "@/components/courses";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CoursesPage = () => {
  return (
    <>
      <PageMetadata
        title="Courses - Up Skillium"
        description="This is up skillium courses page"
        keywords="courses, up-skillium, up skillium, web development"
      />
      <Courses />
    </>
  );
};

CoursesPage.getLayout = function (page: ReactElement) {
  return <RootLayout maxWidth="100000px">{page}</RootLayout>;
};

export default CoursesPage;
