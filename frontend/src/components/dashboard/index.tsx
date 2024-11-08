import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import StudentDashboard from "./student";
import AdminDashboard from "./admin";
import InstructorDashboard from "./instructor";

const DashboardRenderer = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  return (
    <div className="lg:block hidden">
      {user?.role?.role === "student" && <StudentDashboard />}
      {user?.role?.role === "admin" && <AdminDashboard />}
      {user?.role?.role === "instructor" && <InstructorDashboard />}
    </div>
  );
};

export default DashboardRenderer;
