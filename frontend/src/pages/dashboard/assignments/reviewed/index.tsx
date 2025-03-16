import InstructorReviewedAssignments from "@/components/instructorReviewedAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
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

InstructorReviewedAssignmentPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(InstructorReviewedAssignmentPage);
