import ManageReviewedAssignments from "@/components/manageReviewedAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ManageReviewedAssignmentsPage = () => {
  return (
    <>
      <PageMetadata
        title="Reviewed Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ManageReviewedAssignments />
    </>
  );
};

ManageReviewedAssignmentsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default ManageReviewedAssignmentsPage;
