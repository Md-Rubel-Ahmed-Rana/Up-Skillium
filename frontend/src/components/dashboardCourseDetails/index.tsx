import { useGetSingleCourseQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { useRouter } from "next/router";
import CourseImage from "./courseImage";
import IntroVideoPlayer from "./introVideo";
import { Divider } from "antd/lib";
import TitleDescCategoryLevel from "./titleDescCategoryLevel";
import CoursePriceDetails from "./priceDetails";

/*
export type ICourse = {
  id: string;
  title: string;
  category: string;
  description: string;
  level: string;
  price: {
    original: number;
    discount: number;
    salePrice: number;
  };
  tags: string[];
  technologies: string[];
  duration: string;
  instructor: IInstructor;
  students: IUser[];
  reviews: IReview[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
*/

const DashboardCourseDetails = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;
  return (
    <div className="p-2 mt-3">
      {/* course image and intro video  */}
      <div className="flex justify-between gap-2">
        <CourseImage courseId={course?.id} image={course?.image} />
        <IntroVideoPlayer
          courseId={course?.id}
          videoUrl={course?.introductoryVideo}
        />
      </div>
      <Divider />
      <TitleDescCategoryLevel course={course} />
      <Divider />
      <CoursePriceDetails
        courseId={course?.id}
        discount={course?.price?.discount}
        salePrice={course?.price?.salePrice}
        original={course?.price?.original}
      />
    </div>
  );
};

export default DashboardCourseDetails;
