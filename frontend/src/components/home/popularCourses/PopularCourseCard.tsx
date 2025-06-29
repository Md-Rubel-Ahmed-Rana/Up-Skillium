import CourseDetailsRedirectButton from "@/components/courses/courseListing/CourseDetailsRedirectButton";
import { ICourse } from "@/types/course.type";
import Image from "next/image";

type Props = {
  course: ICourse;
};

const PopularCourseCard = ({ course }: Props) => {
  return (
    <div className="bg-white/10 rounded-lg shadow-md hover:shadow-lg border border-white/20 p-2 lg:p-4 transition-all transform hover:scale-105  flex flex-col justify-between">
      <div className="w-full h-40 relative mb-4">
        <Image
          src={course?.image}
          alt={course?.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-md"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 capitalize">{course?.title}</h3>
      <p className="text-sm text-gray-700 mb-3 capitalize">
        {course?.category} - {course.level}
      </p>
      <div className="flex items-center justify-between">
        <div className="text-sm text-yellow-500">
          ⭐ {course?.ratings?.averageRating.toFixed(1)} (
          {course?.ratings?.totalReviews})
        </div>
        <CourseDetailsRedirectButton
          buttonSize="middle"
          buttonType="dashed"
          course={course}
          isButton={true}
          text="View course"
          buttonStyles="bg-blue-600 text-white"
        />
      </div>
    </div>
  );
};

export default PopularCourseCard;
