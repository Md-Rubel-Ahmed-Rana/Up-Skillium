import EditEducation from "@/components/editEducation";
import DashboardLayout from "@/layout/DashboardLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

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
      <DashboardLayout>
        <EditEducation />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(EditEducationPage);
