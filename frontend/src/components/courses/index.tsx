import CoursesBanner from "./CourseBanner";
import CourseSearchFilterableContainer from "./CourseSearchFilterableContainer";

const Courses = () => {
  return (
    <div className="py-2 pb-20">
      <CoursesBanner />
      <CourseSearchFilterableContainer />
    </div>
  );
};

export default Courses;
