import StudentDashboard from "@/components/dashboard/student";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const StudentDashboardPage = () => {
  return (
    <>
      <PageMetadata
        title="Dashboard - Student - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <StudentDashboard />
    </>
  );
};

StudentDashboardPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default StudentDashboardPage;
