import EditEducation from "@/components/editEducation";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const EditEducationPage = () => {
  const { query } = useRouter();
  const institution = query?.institution as string;
  return (
    <>
      <PageMetadata
        title={`Edit Education - ${institution || ""} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <EditEducation />
    </>
  );
};

EditEducationPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default EditEducationPage;
