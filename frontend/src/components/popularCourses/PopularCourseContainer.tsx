import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import PopularCard from "./PopularCard";

const PopularCourseContainer = () => {
  const { data } = useGetAllCoursesQuery({ searchText: "popular" });

  const courses = (data?.data as ICourse[]) || [];
  console.log(courses);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 px-2 md:px-4 lg:px-8">
      {courses?.map((course) => (
        <PopularCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default PopularCourseContainer;
