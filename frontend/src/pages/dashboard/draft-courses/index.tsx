import DraftCourses from "@/components/draftCourses";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const DraftCoursesPage = () => {
  return (
    <>
      <PageMetadata
        title="Draft Courses - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DraftCourses />
    </>
  );
};

DraftCoursesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default DraftCoursesPage;
