/* eslint-disable @next/next/no-img-element */
import { useGetSingleCourseQuery } from "@/features/course";
import IntroductoryVideoPlayer from "./IntroductoryVideoPlayer";
import { useRouter } from "next/router";
import { ICourse } from "@/types/course.type";
import CourseTitleCategoryCard from "./CourseTitleCategoryCard";
import InstructorCard from "./InstructorCard";
import CourseInformation from "./CourseInformation";
import StudentFeedback from "./StudentFeedback";

const url = "https://youtu.be/5Xy-t8k_M4A?si=zkSxI39XAy2xsBa6";

const CourseBasicDetails = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;

  return (
    <div className="lg:p-6 p-2 max-w-4xl mx-auto space-y-6 bg-gray-50 rounded-lg shadow-md">
      <IntroductoryVideoPlayer videoUrl={course?.introductoryVideo || url} />

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
