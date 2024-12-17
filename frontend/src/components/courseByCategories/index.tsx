import { useGetCoursesByCategoryQuery } from "@/features/course";
import CourseSkeleton from "@/skeletons/courseSkeleton";
import { ICourse } from "@/types/course.type";
import { useRouter } from "next/router";
import CourseCard from "../courses/courseListing/CourseCard";
import AvailableCategoryList from "./AvailableCategoryList";

const CategorizedCourses = () => {
  const { query } = useRouter();
  const category = query?.category as string;
  const { data, isLoading } = useGetCoursesByCategoryQuery({ category });
  const categorizedCourses = data?.data?.courses as ICourse[];
  const otherCourses = data?.data?.otherCourses as ICourse[];
  return (
    <div className="p-2 lg:p-5">
      <div>
        <h2 className="text-lg lg:text-3xl font-semibold mb-4">
          Explore Courses in the Category:{" "}
          <span className="text-blue-600">{category}</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Discover a curated selection of courses tailored to the{" "}
          <strong>{category}</strong> category. Expand your skills with these
          targeted learning resources.
        </p>
        <AvailableCategoryList />
        {isLoading ? (
          <CourseSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
            {categorizedCourses?.map((course) => (
              <CourseCard course={course} key={course?.id} />
            ))}
          </div>
        )}
      </div>
      <div className="py-20">
        <h2 className="text-3xl font-semibold mb-4">
          Discover More Learning Opportunities
        </h2>
        <p className="text-gray-600 mb-6">
          Broaden your horizons with our diverse range of courses across various
          categories. Perfect for exploring new interests or supplementing your
          learning journey.
        </p>
        {isLoading ? (
          <CourseSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
            {otherCourses?.map((course) => (
              <CourseCard course={course} key={course?.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorizedCourses;
