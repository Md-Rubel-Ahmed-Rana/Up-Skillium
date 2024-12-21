import { useGetLoggedInUserQuery } from "@/features/auth";
import DashboardSidebarSkeleton from "@/skeletons/dashboardSidebarSkeleton";
import { IUser } from "@/types/user.type";
import AdminSidebar from "./AdminSidebar";
import DefaultSidebar from "./DefaultSidebar";
import InstructorSidebar from "./InstructorSidebar";
import StudentSidebar from "./StudentSidebar";

const DashboardSidebar = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  const renderDashboard =
    user && user?.role?.name === "student" ? (
      <StudentSidebar />
    ) : user?.role?.name === "admin" ? (
      <AdminSidebar />
    ) : user?.role?.name === "instructor" ? (
      <InstructorSidebar />
    ) : (
      <DefaultSidebar />
    );

  return (
    <>
      {isLoading ? <DashboardSidebarSkeleton /> : <div>{renderDashboard}</div>}
    </>
  );
};

export default DashboardSidebar;
