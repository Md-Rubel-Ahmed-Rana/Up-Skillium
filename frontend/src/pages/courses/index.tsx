import Courses from "@/components/courses";
import baseApi from "@/features/api";
import RootLayout from "@/layout/RootLayout";
import { ICourse } from "@/types/course.type";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const apiUrl = `${baseApi}/course/`;

type CoursesPageProps = {
  courses: ICourse[];
};

const CoursesPage = ({ courses }: CoursesPageProps) => {
  return (
    <>
      <PageMetadata
        title="Courses - Up Skillium"
        description="This is up skillium courses page"
        keywords="courses, up-skillium, up skillium, web development"
      />
      <Courses courses={courses} />
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    const data = await response.json();
    const courses: ICourse[] = data?.data;

    return {
      props: {
        courses,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);

    return {
      props: {
        courses: [],
      },
    };
  }
};

CoursesPage.getLayout = function (page: ReactElement) {
  return <RootLayout maxWidth="100000px">{page}</RootLayout>;
};

export default CoursesPage;
