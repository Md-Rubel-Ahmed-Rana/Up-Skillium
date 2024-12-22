import InstructorPreviousLiveClasses from "@/components/instructorPreviousLiveClasses";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorPreviousLiveClassesPage = () => {
  return (
    <>
      <PageMetadata
        title={`Previous live classes - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorPreviousLiveClasses />
    </>
  );
};

InstructorPreviousLiveClassesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default InstructorPreviousLiveClassesPage;