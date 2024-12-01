import CourseDetailsRedirectButton from "@/components/courses/CourseDetailsRedirectButton";
import { ICourse } from "@/types/course.type";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
    },
  }),
};

type Props = {
  course: ICourse;
  index: number;
};

const PopularCourseCard = ({ course, index }: Props) => {
  return (
    <motion.div
      data-aos="fade-up"
      key={course?.id}
      className="bg-white/10 rounded-lg shadow-md hover:shadow-lg border border-white/20 p-2 lg:p-4 transition-all transform hover:scale-105 bg-gradient-to-b from-purple-500 to-pink-500"
      custom={index}
      variants={cardVariants}
    >
      <img
        src={course?.image}
        alt={course?.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{course?.title}</h3>
      <p className="text-sm text-gray-300 mb-3 capitalize">
        {course?.category} - {course.level}
      </p>
      <div className="flex items-center justify-between">
        <div className="text-sm text-yellow-300">
          ⭐ {course?.ratings?.averageRating.toFixed(1)} (
          {course?.ratings?.totalReviews})
        </div>
        <CourseDetailsRedirectButton
          buttonSize="middle"
          buttonType="dashed"
          course={course}
          isButton={false}
          text="View course"
          linkStyles="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold  rounded-lg shadow-lg px-2 py-1 hover:shadow-xl hover:from-purple-700  hover:to-purple-700 transition-all duration-300"
        />
      </div>
    </motion.div>
  );
};

export default PopularCourseCard;
