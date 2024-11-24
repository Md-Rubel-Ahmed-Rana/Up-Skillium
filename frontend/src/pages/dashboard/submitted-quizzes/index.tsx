import SubmittedQuizzes from "@/components/submittedQuizzes";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const SubmittedQuizzesPage = () => {
  return (
    <>
      <PageMetadata
        title={`Submitted Quizzes - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <SubmittedQuizzes />
    </>
  );
};

SubmittedQuizzesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default SubmittedQuizzesPage;
