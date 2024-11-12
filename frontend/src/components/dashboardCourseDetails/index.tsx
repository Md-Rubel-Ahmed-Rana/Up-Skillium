import { useGetSingleCourseQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { useRouter } from "next/router";
import CourseImage from "./courseImage";
import IntroVideoPlayer from "./introVideo";
import { Divider } from "antd/lib";
import TitleDescCategoryLevel from "./titleDescCategoryLevel";
import CoursePriceDetails from "./priceDetails";
import TagsTechnologies from "./tagsTechnologies";
import CourseInstructor from "./courseInstructor";

const DashboardCourseDetails = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;
  return (
    <div className="p-2 mt-3">
      {/* course image and intro video  */}
      <div className="flex flex-col lg:flex-row justify-between gap-2">
        <CourseImage courseId={course?.id} image={course?.image} />
        <IntroVideoPlayer
          courseId={course?.id}
          videoUrl={course?.introductoryVideo}
        />
      </div>
      <Divider />
      {/* course instructor info  */}
      <CourseInstructor instructor={course?.instructor} />
      <Divider />
      {/* course title, description, category, status, duration and  level  */}
      <TitleDescCategoryLevel course={course} />
      <Divider />
      {/* course prices  */}
      <CoursePriceDetails
        courseId={course?.id}
        discount={course?.price?.discount}
        salePrice={course?.price?.salePrice}
        original={course?.price?.original}
      />
      <Divider />
      {/* course tags and technologies  */}
      <TagsTechnologies
        courseId={course?.id}
        tags={course?.tags}
        technologies={course?.technologies}
      />
    </div>
  );
};

export default DashboardCourseDetails;
