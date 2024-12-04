import CoursesBanner from "./CourseBanner";
import CourseContainer from "./CourseContainer";

const Courses = () => {
  return (
    <div className="pb-20">
      <div className="max-h-[10%] h-full">
        <CoursesBanner />
      </div>
      <CourseContainer />
    </div>
  );
};

export default Courses;
