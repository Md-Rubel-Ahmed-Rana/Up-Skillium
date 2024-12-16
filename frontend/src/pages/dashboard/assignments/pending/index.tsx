import InstructorPendingAssignments from "@/components/instructorPendingAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorPendingAssignmentPage = () => {
  return (
    <>
      <PageMetadata
        title="Pending Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorPendingAssignments />
    </>
  );
};

export default InstructorPendingAssignmentPage;

InstructorPendingAssignmentPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
