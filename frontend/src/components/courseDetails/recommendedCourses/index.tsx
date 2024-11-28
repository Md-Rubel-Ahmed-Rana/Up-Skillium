import CourseGridContainer from "@/components/courses/CourseGridContainer";
import { useGetRelatedCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { useRouter } from "next/router";

const RecommendedCourses = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const courseTitle = query?.courseTitle as string;
  const category = query?.category as string;
  const description = query?.description as string;
  const { data, isLoading } = useGetRelatedCoursesQuery({
    relatableText: `${courseTitle} ${category} ${description}`,
  });

  const courses = data?.data as ICourse[];
  const filteredCourses = courses?.filter((course) => course.id !== courseId);

  return (
    <div className="py-10 max-w-[1200px] mx-auto">
      <h2 className="lg:text-2xl text-lg ml-3 -mb-7 font-bold text-gray-800">
        Recommended Courses
      </h2>
      <CourseGridContainer courses={filteredCourses} isLoading={isLoading} />
    </div>
  );
};

export default RecommendedCourses;
