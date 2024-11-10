import { useGetLoggedInUserQuery } from "@/features/auth";
import { useMyCoursesQuery } from "@/features/student";
import { IMyCourse } from "@/types/course.type";
import { IUser } from "@/types/user.type";
import MyCourseCard from "./MyCourseCard";
import MyCourseSkeleton from "@/skeletons/courseSkeleton";

const MyCourses = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const { data: courseData, isLoading } = useMyCoursesQuery({
    userId: user?.id,
  });
  const courses =
    ((courseData?.data?.courses ||
      courseData?.data?.coursesEnrolled) as IMyCourse[]) || [];
  return (
    <>
      {isLoading ? (
        <MyCourseSkeleton />
      ) : (
        <div className="mt-5">
          {courses?.map((course) => (
            <MyCourseCard key={course?.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
};

export default MyCourses;
