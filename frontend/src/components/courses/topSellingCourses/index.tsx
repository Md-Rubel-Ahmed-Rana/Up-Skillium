import { useGetAllPublishedCoursesQuery } from "@/features/course";
import CourseSkeleton from "@/skeletons/courseSkeleton";
import { ICourse } from "@/types/course.type";
import TopSellingCard from "./TopSellingCard";

const TopSellingCourses = () => {
  const { data, isLoading } = useGetAllPublishedCoursesQuery({});
  const courses = (data?.data?.courses as ICourse[]) || [];
  const sortedCourses = [...courses]
    .sort((a, b) => b?.students?.length - a?.students?.length)
    .slice(0, 5);
  return (
    <>
      <div className="border-t mt-20 mb-5"></div>
      <div className="max-w-[1200px] w-full mx-auto  p-2 ">
        <h1 className="text-lg lg:text-3xl font-semibold mb-5">
          Top Selling courses
        </h1>
        {isLoading ? (
          <CourseSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourses.map((course) => (
              <TopSellingCard key={course?.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TopSellingCourses;
