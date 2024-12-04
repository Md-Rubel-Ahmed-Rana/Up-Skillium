import { ICourse } from "@/types/course.type";
import PopularCourseCard from "./PopularCourseCard";

type Props = {
  courses: ICourse[];
};

const PopularCourseContainer = ({ courses }: Props) => {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6">
        {courses.map((course) => (
          <PopularCourseCard course={course} key={course?.id} />
        ))}
      </div>
    </div>
  );
};

export default PopularCourseContainer;
