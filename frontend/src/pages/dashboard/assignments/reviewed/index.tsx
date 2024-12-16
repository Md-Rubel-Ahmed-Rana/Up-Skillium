import InstructorReviewedAssignments from "@/components/instructorReviewedAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorReviewedAssignmentPage = () => {
  return (
    <>
      <PageMetadata
        title="Reviewed Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorReviewedAssignments />
    </>
  );
};

export default InstructorReviewedAssignmentPage;

InstructorReviewedAssignmentPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
