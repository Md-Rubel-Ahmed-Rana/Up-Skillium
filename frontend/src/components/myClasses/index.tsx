import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetInstructorCoursesQuery } from "@/features/course";
import CourseSkeleton from "@/skeletons/courseSkeleton";
import { ICourse } from "@/types/course.type";
import { IUser } from "@/types/user.type";
import MyClassContainer from "./MyClassContainer";

const MyClasses = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  const { data: instructorCourses, isLoading } = useGetInstructorCoursesQuery({
    instructorId: user?.id,
  });
  const courses = instructorCourses?.data as ICourse[];
  return (
    <>
      {isLoading ? (
        <CourseSkeleton />
      ) : (
        <>
          {courses?.length <= 0 ? (
            <div className="h-screen flex justify-center items-center pb-20">
              <h2 className="text-2xl font-bold">No Course Found</h2>
            </div>
          ) : (
            <MyClassContainer courses={courses} />
          )}
        </>
      )}
    </>
  );
};

export default MyClasses;
