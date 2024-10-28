import CourseContainer from "@/components/courses";
import CoursesBanner from "@/components/courses/coursesBanner";



const CoursesPage = () => {
    return (
        <div>
          <CoursesBanner />
          <CourseContainer />
        </div>
    );
};

export default CoursesPage;