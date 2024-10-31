import { ICourse } from "@/types/course.type";
import CourseCard from "./CourseCard";

type Props = {
  courses: ICourse[];
};

const CourseContainer = ({ courses }: Props) => {
  return (
    <div className="max-w-[1200px] w-full mx-auto">
      {courses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
          {courses?.map((course) => (
            <CourseCard key={course?.id} course={course} />
          ))}
        </div>
      ) : (
        <div>No course found</div>
      )}
    </div>
  );
};

export default CourseContainer;
