/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllCoursesQuery } from "@/features/course";
import CoursesBanner from "./CourseBanner";
import CourseContainer from "./CourseContainer";
import { ICourse } from "@/types/course.type";
import CourseSearch from "./CourseSearch";

const Courses = () => {
  const { data } = useGetAllCoursesQuery({});
  const courses = (data?.data as ICourse[]) || [];

  return (
    <>
      <CoursesBanner />
      <CourseSearch />
      <CourseContainer courses={courses} />
    </>
  );
};

export default Courses;
