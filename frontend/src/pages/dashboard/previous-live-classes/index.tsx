import InstructorPreviousLiveClasses from "@/components/instructorPreviousLiveClasses";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const InstructorPreviousLiveClassesPage = () => {
  return (
    <>
      <PageMetadata
        title={`Previous live classes - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <InstructorPreviousLiveClasses />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(InstructorPreviousLiveClassesPage, ["instructor"])
);
