import StudentLiveClasses from "@/components/studentLiveClasses";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import dynamic from "next/dynamic";
const TestDashboardLayout = dynamic(import("@/layout/TestDashboardLayout"), {
  ssr: false,
});

const StudentLiveClassesPage = () => {
  return (
    <>
      <PageMetadata
        title="Live Classes - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <TestDashboardLayout>
        <StudentLiveClasses />
      </TestDashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(StudentLiveClassesPage, "student")
);
