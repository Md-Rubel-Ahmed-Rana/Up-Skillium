import { useGetAllCoursesQuery } from "@/features/course";
import CourseSkeleton from "@/skeletons/courseSkeleton";
import { ICourse } from "@/types/course.type";
import { motion } from "framer-motion";
import PopularCourseCard from "./PopularCourseCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const PopularCourseContainer = () => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const courses = (data?.data as ICourse[]) || [];

  return (
    <div className="mt-10 px-5 md:px-20">
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <CourseSkeleton />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {courses.map((course, index) => (
            <PopularCourseCard course={course} index={index} key={course?.id} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PopularCourseContainer;
