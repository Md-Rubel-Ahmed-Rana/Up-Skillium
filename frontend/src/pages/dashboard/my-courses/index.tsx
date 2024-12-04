import MyCoursePageRenderer from "@/components/dashboard/my-courses";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const MyCoursesPage = () => {
  return (
    <>
      <PageMetadata
        title="My Courses - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <MyCoursePageRenderer />
    </>
  );
};

MyCoursesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default MyCoursesPage;
