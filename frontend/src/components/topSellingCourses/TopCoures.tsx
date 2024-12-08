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
              Popular
            </div>
          </div>
          <FaStar className="text-4xl text-yellow-500 absolute top-4 right-4" />
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {course?.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {course?.description}
            </p>
         <div className="mt-4 flex justify-between items-center gap-2">
      <CourseDetailsRedirectButton
        buttonSize="large"
        buttonStyles="flex-1 bg-cyan-500 text-white text-center text-lg rounded-lg hover:bg-yellow-600 transition duration-300"
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
        buttonSize="large"
        styles="flex-1 bg-blue-500 text-white text-center text-lg rounded-lg hover:bg-blue-600 transition duration-300"
      />
    </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCourses;
