import { useGetAllCoursesQuery } from "@/features/course";
import CourseSkeleton from "@/skeletons/courseSkeleton";
import { ICourse } from "@/types/course.type";
import PopularCourseCard from "./PopularCourseCard";

const PopularCourseContainer = () => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const courses = (data?.data as ICourse[]) || [];

  return (
    <div className="mt-10">
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <CourseSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6">
          {courses.map((course, index) => (
            <PopularCourseCard course={course} key={course?.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularCourseContainer;
