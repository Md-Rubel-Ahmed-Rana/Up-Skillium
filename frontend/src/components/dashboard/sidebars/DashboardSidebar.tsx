import { useGetLoggedInUserQuery } from "@/features/auth";
import DashboardSidebarSkeleton from "@/skeletons/dashboardSidebarSkeleton";
import { IUser } from "@/types/user.type";
import AdminSidebar from "./AdminSidebar";
import InstructorSidebar from "./InstructorSidebar";
import StudentSidebar from "./StudentSidebar";

const DashboardSidebar = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  return (
    <>
      {isLoading ? (
        <DashboardSidebarSkeleton />
      ) : (
        <div>
          {user?.role?.name === "student" && <StudentSidebar />}
          {user?.role?.name === "admin" && <AdminSidebar />}
          {user?.role?.name === "instructor" && <InstructorSidebar />}
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
