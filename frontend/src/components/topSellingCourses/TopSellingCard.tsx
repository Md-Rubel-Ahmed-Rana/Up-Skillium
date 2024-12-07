import { topSellingCourses } from "@/constants/topCoursesdata";
import SmallCourses from "./TopCoures";

const TopSellingCard = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold font-serif ml-4 md:ml-8 mt-6 md:mt-10">
        Top Rated Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-8">
        {topSellingCourses.map((course) => (
          <SmallCourses key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export default TopSellingCard;
