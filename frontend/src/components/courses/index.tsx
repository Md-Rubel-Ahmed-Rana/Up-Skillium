import { ICourse } from "@/types/course.type";
import CoursesBanner from "./banner";
import CourseContainer from "./courseListing";
import TopSellingCourses from "./topSellingCourses";

type Props = {
  courses: ICourse[];
};

const Courses = ({ courses }: Props) => {
  return (
    <div className="pb-20">
      <div className="max-h-[10%] h-full">
        <CoursesBanner courses={courses} />
      </div>
      <CourseContainer />
      <TopSellingCourses />
    </div>
  );
};

export default Courses;
