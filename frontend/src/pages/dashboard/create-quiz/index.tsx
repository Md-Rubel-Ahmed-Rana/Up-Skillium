import CreateQuizLesson from "@/components/createQuiz";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CreateQuizLessonPage = () => {
  return (
    <>
      <PageMetadata
        title="Create Quiz - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CreateQuizLesson />
    </>
  );
};

export default CreateQuizLessonPage;

CreateQuizLessonPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
