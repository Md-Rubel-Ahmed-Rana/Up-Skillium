import ManagePendingAssignments from "@/components/managePendingAssignments";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ManagePendingAssignmentsPage = () => {
  return (
    <>
      <PageMetadata
        title="Pending Assignments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <ManagePendingAssignments />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(ManagePendingAssignmentsPage, ["admin"])
);
