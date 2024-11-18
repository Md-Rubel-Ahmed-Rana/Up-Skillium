import PublishedCourses from "@/components/publishedCourses";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const PublishedCoursesPage = () => {
  return (
    <>
      <PageMetadata
        title="Published Courses - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <PublishedCourses />
    </>
  );
};

PublishedCoursesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default PublishedCoursesPage;
