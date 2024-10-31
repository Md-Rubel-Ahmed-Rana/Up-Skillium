/* eslint-disable @next/next/no-img-element */
import { useGetSingleCourseQuery } from "@/features/course";
import IntroductoryVideoPlayer from "./IntroductoryVideoPlayer";
import { useRouter } from "next/router";
import { ICourse } from "@/types/course.type";
import CourseTitleCategoryCard from "./CourseTitleCategoryCard";
import InstructorCard from "./InstructorCard";
import CourseInformation from "./CourseInformation";
import StudentFeedback from "./StudentFeedback";

const url =
  "https://firebasestorage.googleapis.com/v0/b/up-skillium.appspot.com/o/up-skillium%2Fcourse-introductory-videos%2FShibir-jannati-dol.mp4?alt=media&token=138383d6-7d05-4579-a0a7-88de21fa291e";

const CourseBasicDetails = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-gray-50 rounded-lg shadow-md">
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
