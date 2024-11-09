import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import StudentSidebar from "./StudentSidebar";
import AdminSidebar from "./AdminSidebar";
import InstructorSidebar from "./InstructorSidebar";
import DashboardSidebarSkeleton from "@/skeletons/DashboardSidebarSkeleton";

const DashboardSidebar = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  return (
    <>
      {isLoading ? (
        <DashboardSidebarSkeleton />
      ) : (
        <div>
          {user?.role?.role === "student" && <StudentSidebar />}
          {user?.role?.role === "admin" && <AdminSidebar />}
          {user?.role?.role === "instructor" && <InstructorSidebar />}
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
