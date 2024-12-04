import ManageAssignments from "@/components/manageAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ManageAssignmentsPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ManageAssignments />
    </>
  );
};

ManageAssignmentsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default ManageAssignmentsPage;
