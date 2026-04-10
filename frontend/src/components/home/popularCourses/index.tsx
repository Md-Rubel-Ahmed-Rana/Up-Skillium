import { ICourse } from "@/types/course.type";
import PopularCourseContainer from "./PopularCourseContainer";
import PopularCourseHeader from "./PopularCourseHeader";

type Props = {
  courses: ICourse[];
};

const PopularCourses = ({ courses }: Props) => {
  return (
    <div className="w-full py-20  relative">
      <div className="max-w-[1230px] w-full mx-auto">
        <PopularCourseHeader />
        <PopularCourseContainer courses={courses} />
      </div>
    </div>
  );
};

export default PopularCourses;
