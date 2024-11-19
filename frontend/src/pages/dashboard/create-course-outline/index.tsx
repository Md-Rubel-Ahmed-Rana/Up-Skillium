import CreateCourseOutline from "@/components/createCourseOutline";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CreateCourseOutlinePage = () => {
  return (
    <>
      <PageMetadata
        title="Create outline - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CreateCourseOutline />
    </>
  );
};

CreateCourseOutlinePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default CreateCourseOutlinePage;