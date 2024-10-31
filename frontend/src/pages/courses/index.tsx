import Courses from "@/components/courses";
import PageMetadata from "@/utils/PageMetadata";

const CoursesPage = () => {
  return (
    <>
      <PageMetadata
        title="Courses - Up Skillium"
        description="This is up skillium courses page"
        keywords="courses, up-skillium, up skillium, web development"
      />
      <Courses />
    </>
  );
};

export default CoursesPage;
