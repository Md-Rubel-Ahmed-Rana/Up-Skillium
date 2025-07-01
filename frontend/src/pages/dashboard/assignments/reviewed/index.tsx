import InstructorReviewedAssignments from "@/components/instructorReviewedAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const InstructorReviewedAssignmentPage = () => {
  return (
    <>
      <PageMetadata
        title="Reviewed Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <InstructorReviewedAssignments />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(InstructorReviewedAssignmentPage, ["instructor"])
);
