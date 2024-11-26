import CourseGridContainer from "@/components/courses/CourseGridContainer";
import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";

const RecommrndedCourses = () => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const courses = data?.data as ICourse[];

  return (
    <div className="py-10 max-w-[1200px] mx-auto">
      <h2 className="lg:text-2xl text-lg ml-3 -mb-7 font-bold text-gray-800">
        Recommended Courses
      </h2>
      <CourseGridContainer courses={courses} isLoading={isLoading} />
    </div>
  );
};

export default RecommrndedCourses;
