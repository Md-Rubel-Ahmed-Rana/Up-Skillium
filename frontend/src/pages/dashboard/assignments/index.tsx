import InstructorAssignmentLesson from "@/components/instructorAssignmentLesson";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
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

InstructorAssignmentLessonPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(InstructorAssignmentLessonPage);
