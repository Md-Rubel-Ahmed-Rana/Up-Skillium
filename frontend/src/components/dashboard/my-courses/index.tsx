import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import InstructorMyCourses from "./instructor";
import StudentMyCourses from "./student";

const MyCoursePageRenderer = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  return (
    <div>
      {user?.role?.name === "student" && <StudentMyCourses />}
      {user?.role?.name === "instructor" && <InstructorMyCourses />}
    </div>
  );
};

export default MyCoursePageRenderer;
