import { ICourse } from "@/types/course.type";
import ManageCourseCard from "./ManageCourseCard";

type Props = {
  courses: ICourse[];
};

const ManageCourseGrid = ({ courses }: Props) => {
  return (
    <>
      {courses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {courses.map((course) => (
            <ManageCourseCard course={course} key={course?.id} />
          ))}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-2xl font-bold">No course found!</h1>
        </div>
      )}
    </>
  );
};

export default ManageCourseGrid;
