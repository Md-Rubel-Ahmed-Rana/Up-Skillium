import ManageInstructors from "@/components/manageInstructors";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ManageInstructorsPage = () => {
  return (
    <>
      <PageMetadata
        title="Manage Instructors - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ManageInstructors />
    </>
  );
};

ManageInstructorsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default ManageInstructorsPage;
