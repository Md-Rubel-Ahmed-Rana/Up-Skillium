import UpdateAssignment from "@/components/updateAssignment";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const UpdateAssignmentPage = () => {
  const { query } = useRouter();
  const title = query?.title;
  return (
    <>
      <PageMetadata
        title={`Update Assignment - ${title || " "} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <UpdateAssignment />
    </>
  );
};

UpdateAssignmentPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default UpdateAssignmentPage;
