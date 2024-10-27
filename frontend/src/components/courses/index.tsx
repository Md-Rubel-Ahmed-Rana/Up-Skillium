/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllCoursesQuery } from "@/features/course";
import CourseCard from "./CourseCard";

const CourseContainer = () => {
  const { data } = useGetAllCoursesQuery({});
  const courses = data?.data;
  return (
    <div>
      {courses.map((course: any) => (
        <CourseCard key={course?.id} course={course} />
      ))}
    </div>
  );
};

export default CourseContainer;
