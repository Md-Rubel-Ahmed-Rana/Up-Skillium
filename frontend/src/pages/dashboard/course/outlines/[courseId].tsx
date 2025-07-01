import DashboardCourseOutlines from "@/components/dashboardCourseOutline";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

const DashboardCourseOutlinePage = () => {
  const { query } = useRouter();
  const courseTitle = query?.courseTitle as string;
  return (
    <>
      <PageMetadata
        title={`Course Outlines - ${
          courseTitle || "Course title"
        } - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <DashboardCourseOutlines />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(DashboardCourseOutlinePage, ["admin", "instructor"])
);
