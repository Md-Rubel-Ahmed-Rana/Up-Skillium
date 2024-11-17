import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import AdminDashboard from "./admin";
import InstructorDashboard from "./instructor";
import StudentDashboard from "./student";

const DashboardRenderer = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  return (
    <div className="lg:block hidden">
      {user?.role?.name === "student" && <StudentDashboard />}
      {user?.role?.name === "admin" && <AdminDashboard />}
      {user?.role?.name === "instructor" && <InstructorDashboard />}
    </div>
  );
};

export default DashboardRenderer;
