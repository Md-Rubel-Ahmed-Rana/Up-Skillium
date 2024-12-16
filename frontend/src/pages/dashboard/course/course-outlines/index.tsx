import InstructorCourseOutline from "@/components/instructorCourseOutline";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorCourseOutlinePage = () => {
  return (
    <>
      <PageMetadata
        title="Course outlines - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorCourseOutline />
    </>
  );
};

export default InstructorCourseOutlinePage;

InstructorCourseOutlinePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
