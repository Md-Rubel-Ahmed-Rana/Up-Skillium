import InstructorDashboard from "@/components/dashboard/instructor";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorDashboardPage = () => {
  return (
    <>
      <PageMetadata
        title="Dashboard - Instructor - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorDashboard />
    </>
  );
};

InstructorDashboardPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default InstructorDashboardPage;
