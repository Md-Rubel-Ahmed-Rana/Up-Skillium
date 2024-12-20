import CreateLiveClass from "@/components/createLiveClass";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CreateLiveClassPage = () => {
  return (
    <>
      <PageMetadata
        title={`Create live class - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CreateLiveClass />
    </>
  );
};

export default CreateLiveClassPage;

CreateLiveClassPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
