import CourseSkeleton from "@/skeletons/courseSkeleton";
import { ICourse } from "@/types/course.type";
import { BiError } from "react-icons/bi";
import CourseCard from "./CourseCard";

type Props = {
  courses: ICourse[];
  isLoading: boolean;
};

const CourseContainer = ({ courses, isLoading }: Props) => {
  return (
    <div className="max-w-[1200px] w-full mx-auto p-2">
      {isLoading ? (
        <CourseSkeleton />
      ) : (
        <>
          {courses?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
              {courses?.map((course) => (
                <CourseCard key={course?.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="max-w-md w-full mx-auto flex flex-col justify-center items-center text-center p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
              <BiError className="text-6xl text-red-400 mb-4" />
              <p className="text-lg text-gray-600 font-semibold">
                No course found
              </p>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseContainer;
