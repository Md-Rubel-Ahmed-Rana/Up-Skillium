import InstructorAssignmentLesson from "@/components/instructorAssignmentLesson";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorAssignmentLessonPage = () => {
  return (
    <>
      <PageMetadata
        title="Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorAssignmentLesson />
    </>
  );
};

export default InstructorAssignmentLessonPage;

InstructorAssignmentLessonPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
