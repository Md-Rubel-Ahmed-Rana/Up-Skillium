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
  console.log(data);
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
      <h1 className="text-4xl lg:text-5xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-red-500 mb-4 animate-gradient">
        Best Selling Courses
      </h1>
      <h3 className="text-base lg:text-lg font-medium text-gray-700 mb-8 max-w-3xl">
        Dream big, learn smart, and achieve more—your success story starts here! Take the first step towards unlocking your true potential with courses designed to inspire, empower, and transform your future.
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TopCourses courses={sortedCourses} />
      </div>
    </section>
  );
};

export default TopSellingCard;
