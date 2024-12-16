import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetInstructorCoursesQuery } from "@/features/course";
import { useGetCourseOutlineByInstructorQuery } from "@/features/courseOutline";
import { ICourse } from "@/types/course.type";
import { ICourseOutline } from "@/types/courseOutline.type";
import { IUser } from "@/types/user.type";
import CourseOutlineTable from "../outlines";

const InstructorCourseOutline = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;

  const { data: instructorCourses } = useGetInstructorCoursesQuery({
    instructorId: user?.id,
  });
  const courses = instructorCourses?.data as ICourse[];

  const { data, isLoading } = useGetCourseOutlineByInstructorQuery({
    instructorId: user?.id,
  });
  const courseOutlines = data?.data as ICourseOutline[];

  return (
    <div className="lg:p-5 px-2 pb-20">
      <h1 className="text-2xl font-semibold mb-5">Course Outlines</h1>
      <div className="overflow-x-auto">
        <CourseOutlineTable
          courses={courses}
          isLoading={isLoading}
          outlines={courseOutlines}
        />
      </div>
    </div>
  );
};

export default InstructorCourseOutline;
