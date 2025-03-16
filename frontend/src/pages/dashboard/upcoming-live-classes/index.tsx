import InstructorUpcomingLiveClasses from "@/components/instructorUpcomingLiveClasses";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorUpcomingLiveClassesPage = () => {
  return (
    <>
      <PageMetadata
        title={`Upcoming live classes - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorUpcomingLiveClasses />
    </>
  );
};

InstructorUpcomingLiveClassesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(InstructorUpcomingLiveClassesPage);
