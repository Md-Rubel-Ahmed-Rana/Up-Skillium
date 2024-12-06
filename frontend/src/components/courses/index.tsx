import { ICourse } from "@/types/course.type";
import CoursesBanner from "./CourseBanner";
import CourseContainer from "./CourseContainer";

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
    </div>
  );
};

export default Courses;
