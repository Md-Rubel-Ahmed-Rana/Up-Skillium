import ManageQuizzes from "@/components/manageQuizzes";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ManageQuizzesPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Quizzes - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ManageQuizzes />
    </>
  );
};

ManageQuizzesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default ManageQuizzesPage;