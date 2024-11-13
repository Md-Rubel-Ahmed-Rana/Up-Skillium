import DashboardCourseDetails from "@/components/dashboardCourseDetails";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const DashboardCourseDetailsPage = () => {
  const { query } = useRouter();
  const courseTitle = query?.courseTitle as string;
  return (
    <>
      <PageMetadata
        title={`Course Details - ${
          courseTitle || "Course title"
        } - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardCourseDetails />
    </>
  );
};

DashboardCourseDetailsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default DashboardCourseDetailsPage;
