import { ICourse } from "@/types/course.type";
import { FaStar } from "react-icons/fa";
import CheckoutRedirectButton from "../courses/CheckoutRedirectButton";
import CourseDetailsRedirectButton from "../courses/CourseDetailsRedirectButton";

type Props = {
  courses: ICourse[];
};

const TopCourses = ({ courses }: Props) => {
  return (
    <>
      {courses?.map((course) => (
        <div
          key={course?.id}
          className="bg-white rounded-lg shadow-md overflow-hidden relative group transition-transform transform hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="relative">
            <img
              src={course?.image}
              alt={course?.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
              Top Pick
            </div>
          </div>
          <FaStar className="text-4xl text-yellow-500 absolute top-4 right-4" />
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {course?.title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mb-4">
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                {course?.ratings?.averageRating || 0} ({course?.ratings?.totalReviews || 0} Reviews)
              </span>
              <span className="ml-4">{course?.students?.length || 0} Students</span>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {course?.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
            <CourseDetailsRedirectButton
            buttonSize="middle"
            buttonStyles="w-[100%] bg-orange-700 text-white"
            buttonType="dashed"
            course={course}
            isButton={true}
            text="See Details"
            key={"1"}
          />
          <CheckoutRedirectButton
            course={course}
            buttonText="Buy Now"
            key={"2"}
            buttonSize="middle"
            styles="w-[100%]"
          />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCourses;
