import CreateModule from "@/components/createModule";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const CreateModulePage = () => {
  const { query } = useRouter();
  const courseTitle = query?.courseTitle;
  return (
    <>
      <PageMetadata
        title={`Create module - ${courseTitle || " "} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CreateModule />
    </>
  );
};

export default CreateModulePage;

CreateModulePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
