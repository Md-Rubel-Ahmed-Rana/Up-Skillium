import CourseModuleLayout from "@/layout/CourseModuleLayout";
import RootLayout from "@/layout/RootLayout";
import capitalizeLessonTitle from "@/utils/capitalizeLessonTitle";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const CourseModuleLessonPage = () => {
  const { query } = useRouter();
  const lessonTitle = query?.lessonTitle as string;

  return (
    <>
      <PageMetadata
        title={`${capitalizeLessonTitle(lessonTitle) || "Lesson"}`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CourseModuleLayout />
    </>
  );
};

export default CourseModuleLessonPage;

CourseModuleLessonPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
