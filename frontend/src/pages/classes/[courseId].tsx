import CourseModuleLayout from "@/layout/CourseModuleLayout";
import RootLayout from "@/layout/RootLayout";
import capitalizeLessonTitle from "@/utils/capitalizeLessonTitle";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ModuleLessonViewPage = () => {
  const { query } = useRouter();
  const lessonTitle = query?.lessonTitle as string;

  return (
    <>
      <PageMetadata
        title={`${capitalizeLessonTitle(lessonTitle) || "Lesson Title"}`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CourseModuleLayout />
    </>
  );
};

export default ModuleLessonViewPage;

ModuleLessonViewPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
