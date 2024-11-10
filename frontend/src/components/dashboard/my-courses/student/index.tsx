import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import MyCourseCard from "./MyCourseCard";
import MyCourseSkeleton from "@/skeletons/courseSkeleton";
import { useGetStudentMyCoursesQuery } from "@/features/studentProgress";
import { ICourseProgress } from "@/types/studentProgress.type";

const MyCourses = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const { data: coursesData, isLoading } = useGetStudentMyCoursesQuery({
    userId: user?.id,
  });
  const courses = (coursesData?.data as ICourseProgress[]) || [];

  return (
    <>
      {isLoading ? (
        <MyCourseSkeleton />
      ) : (
        <div className="mt-5">
          {courses?.map((course) => (
            <MyCourseCard key={course?.course?.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
};

export default MyCourses;
