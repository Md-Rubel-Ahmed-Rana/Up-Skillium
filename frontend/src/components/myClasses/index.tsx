import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetInstructorCoursesQuery } from "@/features/course";
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
    <div>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <h2 className="text-2xl font-bold">Courses Loading...</h2>
        </div>
      ) : (
        <>
          {courses?.length <= 0 ? (
            <div className="h-screen flex justify-center items-center">
              <h2 className="text-2xl font-bold">No Course Found</h2>
            </div>
          ) : (
            <MyClassContainer courses={courses} />
          )}
        </>
      )}
    </div>
  );
};

export default MyClasses;
