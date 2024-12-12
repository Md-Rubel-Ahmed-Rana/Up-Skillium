import CourseOutlines from "@/components/courseOutlines";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CourseOutlinesPage = () => {
  return (
    <>
      <PageMetadata
        title="Course outlines - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CourseOutlines />
    </>
  );
};

export default CourseOutlinesPage;

CourseOutlinesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};