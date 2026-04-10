import DashboardCourseDetails from "@/components/dashboardCourseDetails";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

const DashboardCourseDetailsPage = () => {
  const { query } = useRouter();
  const courseTitle = query?.courseTitle as string;
  return (
    <>
      <PageMetadata
        title={`Course Details - ${
          courseTitle || "Course title"
        } - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <DashboardCourseDetails />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(DashboardCourseDetailsPage, ["admin", "instructor"])
);
