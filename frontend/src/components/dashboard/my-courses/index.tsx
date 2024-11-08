import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import StudentMyCourses from "./student";
import InstructorMyCourses from "./instructor";

const MyCoursePageRenderer = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  return (
    <div>
      {user?.role?.role === "student" && <StudentMyCourses />}
      {user?.role?.role === "instructor" && <InstructorMyCourses />}
    </div>
  );
};

export default MyCoursePageRenderer;
