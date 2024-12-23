import StudentLiveClasses from "@/components/studentLiveClasses";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const StudentLiveClassesPage = () => {
  return (
    <>
      <PageMetadata
        title="Live Classes - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <StudentLiveClasses />
    </>
  );
};

StudentLiveClassesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default StudentLiveClassesPage;
