/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllCoursesQuery } from "@/features/course";
import CourseCard from "./CourseCard";

const CourseContainer = () => {
  const { data } = useGetAllCoursesQuery({});
  console.log(data)
  const courses = data?.data;

  return (
    <div className="grid grid-cols-3 gap-7 mt-10">
      {courses?.map((course: any) => (
        <CourseCard key={course?.id} course={course} />
      ))}
    </div>
  );
};

export default CourseContainer;



