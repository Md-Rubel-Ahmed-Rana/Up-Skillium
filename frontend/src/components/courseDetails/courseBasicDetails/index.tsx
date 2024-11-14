import { useGetSingleCourseQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { useRouter } from "next/router";
import CourseInformation from "./CourseInformation";
import CourseTitleCategoryCard from "./CourseTitleCategoryCard";
import InstructorCard from "./InstructorCard";
import IntroductoryVideoPlayer from "./IntroductoryVideoPlayer";
import StudentFeedback from "./StudentFeedback";

const CourseBasicDetails = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;

  return (
    <div className="lg:p-6 p-2 max-w-4xl mx-auto space-y-6 bg-gray-50 rounded-lg shadow-md">
      <IntroductoryVideoPlayer videoUrl={course?.introductoryVideo} />

      <CourseTitleCategoryCard
        title={course?.title}
        category={course?.category}
      />

      <InstructorCard instructor={course?.instructor} />

      <CourseInformation course={course} />

      <StudentFeedback course={course} />
    </div>
  );
};

export default CourseBasicDetails;
