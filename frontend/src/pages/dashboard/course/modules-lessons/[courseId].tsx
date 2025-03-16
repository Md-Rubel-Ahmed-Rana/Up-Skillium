import DashboardModulesLessons from "@/components/dashboardModulesLessons";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const DashboardModulesLessonsPage = () => {
  const { query } = useRouter();
  const courseTitle = query?.courseTitle as string;

  return (
    <>
      <PageMetadata
        title={`Course Modules & Lessons - ${
          courseTitle || "Course title"
        } - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardModulesLessons />
    </>
  );
};

DashboardModulesLessonsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(DashboardModulesLessonsPage);
