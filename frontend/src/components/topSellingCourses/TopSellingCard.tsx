import { useLazyGetAllPublishedCoursesQuery } from "@/features/course";
import CourseSkeleton from "@/skeletons/courseSkeleton";
import { ICourse } from "@/types/course.type";
import { useEffect } from "react";
import TopCourses from "./TopCoures";


const TopSellingCard = () => {
  const [trigger, { data, isLoading }] = useLazyGetAllPublishedCoursesQuery({
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    trigger({});
  }, [trigger]);

  const courses = (data?.data?.courses as ICourse[]) || [];
  const sortedCourses = [...courses]
    .sort((a, b) => b.students.length - a.students.length)
    .slice(0, 3);

  if (isLoading) {
    return <CourseSkeleton />;
  }

  return (
    <section className="px-6 lg:px-20 py-10">
      <h1 className="text-3xl lg:text-4xl font-sans font-extrabold text-gray-800 mb-6 text-center">
        Top Rated Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TopCourses courses={sortedCourses} />
      </div>
    </section>
  );
};

export default TopSellingCard;
