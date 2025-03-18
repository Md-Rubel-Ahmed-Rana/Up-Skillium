import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllMyCoursesQuery } from "@/features/myCourse";
import MyCourseSkeleton from "@/skeletons/courseSkeleton";
import { IMyCourse } from "@/types/myCourse.type";
import { IUser } from "@/types/user.type";
import MyCourseCard from "./MyCourseCard";

const MyCourses = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const { data: coursesData, isLoading } = useGetAllMyCoursesQuery({
    userId: user?.id,
  });
  const courses = (coursesData?.data as IMyCourse[]) || [];

  return (
    <>
      {isLoading ? (
        <MyCourseSkeleton />
      ) : (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {courses?.map((course) => (
            <MyCourseCard key={course?.course?.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
};

export default MyCourses;
