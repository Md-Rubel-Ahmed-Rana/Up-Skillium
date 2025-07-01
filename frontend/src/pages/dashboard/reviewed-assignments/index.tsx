import ManageReviewedAssignments from "@/components/manageReviewedAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ManageReviewedAssignmentsPage = () => {
  return (
    <>
      <PageMetadata
        title="Reviewed Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <ManageReviewedAssignments />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(ManageReviewedAssignmentsPage, ["admin"])
);
