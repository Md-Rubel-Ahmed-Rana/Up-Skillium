import CategorizedCourses from "@/components/courseByCategories";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const CategorizedCoursesPage = () => {
  const { query } = useRouter();
  const category = query?.category as string;

  return (
    <>
      <PageMetadata
        title={`Courses of category - ${category || ""} - Up Skillium`}
        description="This is up skillium courses page"
        keywords="courses, up-skillium, up skillium, web development"
      />
      <CategorizedCourses />
    </>
  );
};

CategorizedCoursesPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default CategorizedCoursesPage;
