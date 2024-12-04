import DashboardCourseOutlines from "@/components/dashboardCourseOutline";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const DashboardCourseOutlinePage = () => {
  const { query } = useRouter();
  const courseTitle = query?.courseTitle as string;
  return (
    <>
      <PageMetadata
        title={`Course Outlines - ${
          courseTitle || "Course title"
        } - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardCourseOutlines />
    </>
  );
};

DashboardCourseOutlinePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default DashboardCourseOutlinePage;
