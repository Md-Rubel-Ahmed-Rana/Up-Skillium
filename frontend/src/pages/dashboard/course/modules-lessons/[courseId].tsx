import DashboardModulesLessons from "@/components/dashboardModulesLessons";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

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
      <DashboardLayout>
        <DashboardModulesLessons />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(DashboardModulesLessonsPage, ["admin", "instructor"])
);
