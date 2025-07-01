import InstructorPendingAssignments from "@/components/instructorPendingAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const InstructorPendingAssignmentPage = () => {
  return (
    <>
      <PageMetadata
        title="Pending Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <InstructorPendingAssignments />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(InstructorPendingAssignmentPage, ["instructor"])
);
