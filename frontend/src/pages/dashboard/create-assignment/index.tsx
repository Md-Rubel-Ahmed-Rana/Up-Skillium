import CreateAssignment from "@/components/createAssignment";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CreateAssignmentPage = () => {
  return (
    <>
      <PageMetadata
        title="Create Assignment - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CreateAssignment />
    </>
  );
};

export default CreateAssignmentPage;

CreateAssignmentPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};