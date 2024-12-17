import { useGetSingleCourseQuery } from "@/features/course";
import { CourseDetailsSkeleton } from "@/skeletons/courseDetailsSkeleton";
import { ICourse } from "@/types/course.type";
import { useRouter } from "next/router";
import StudentFeedback from "../feedback/StudentFeedback";
import CourseInformation from "./CourseInformation";
import CourseTitleCategoryCard from "./CourseTitleCategoryCard";
import InstructorCard from "./InstructorCard";
import IntroductoryVideoPlayer from "./IntroductoryVideoPlayer";

const CourseBasicDetails = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data, isLoading } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;

  return (
    <>
      {!isLoading ? (
        <CourseDetailsSkeleton />
      ) : (
        <div className="p-2 max-w-4xl mx-auto space-y-6 bg-gray-50 rounded-lg shadow-md">
          <IntroductoryVideoPlayer videoUrl={course?.introductoryVideo} />

          <CourseTitleCategoryCard
            title={course?.title}
            category={course?.category}
            totalStudents={course?.students?.length}
          />

          <InstructorCard instructor={course?.instructor} />

          <CourseInformation course={course} />

          <StudentFeedback course={course} />
        </div>
      )}
    </>
  );
};

export default CourseBasicDetails;
