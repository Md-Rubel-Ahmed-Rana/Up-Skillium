import MyCourses from "@/components/myCourses";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import dynamic from "next/dynamic";

const TestDashboardLayout = dynamic(import("@/layout/TestDashboardLayout"), {
  ssr: false,
});

const MyCoursesPage = () => {
  return (
    <>
      <PageMetadata
        title="My Courses - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <TestDashboardLayout>
        <MyCourses />
      </TestDashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(MyCoursesPage, "student"));
