import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllMyCoursesQuery } from "@/features/myCourse";
import MyCourseSkeleton from "@/skeletons/courseSkeleton";
import { IMyCourse } from "@/types/myCourse.type";
import { IUser } from "@/types/user.type";
import { Button } from "antd/lib";
import Link from "next/link";
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
        <>
          {courses.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              {courses?.map((course) => (
                <MyCourseCard key={course?.course?.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen text-center">
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold">
                  You have not enrolled to any course yet!
                </h2>
                <Link href={"/courses"}>
                  <Button type="primary">Explore courses</Button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyCourses;
