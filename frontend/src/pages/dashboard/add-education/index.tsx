import AddEducation from "@/components/addEducation";
import DashboardLayout from "@/layout/DashboardLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const AddEducationPage = () => {
  return (
    <>
      <PageMetadata
        title="Add Education - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <AddEducation />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AddEducationPage);
