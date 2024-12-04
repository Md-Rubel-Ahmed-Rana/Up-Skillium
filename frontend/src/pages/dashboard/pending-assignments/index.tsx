import ManagePendingAssignments from "@/components/managePendingAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ManagePendingAssignmentsPage = () => {
  return (
    <>
      <PageMetadata
        title="Pending Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ManagePendingAssignments />
    </>
  );
};

ManagePendingAssignmentsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default ManagePendingAssignmentsPage;
