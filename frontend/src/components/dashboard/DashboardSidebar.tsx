import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import StudentSidebar from "./StudentSidebar";
import AdminSidebar from "./AdminSidebar";
import InstructorSidebar from "./InstructorSidebar";

const DashboardSidebar = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  return (
    <div className="h-screen fixed overflow-y-auto pb-20">
      {user?.role?.role === "student" && <StudentSidebar />}
      {user?.role?.role === "admin" && <AdminSidebar />}
      {user?.role?.role === "instructor" && <InstructorSidebar />}
    </div>
  );
};

export default DashboardSidebar;
