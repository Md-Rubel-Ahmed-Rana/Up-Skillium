import InstructorUpcomingLiveClasses from "@/components/instructorUpcomingLiveClasses";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const InstructorUpcomingLiveClassesPage = () => {
  return (
    <>
      <PageMetadata
        title={`Upcoming live classes - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <InstructorUpcomingLiveClasses />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(InstructorUpcomingLiveClassesPage, ["instructor"])
);
