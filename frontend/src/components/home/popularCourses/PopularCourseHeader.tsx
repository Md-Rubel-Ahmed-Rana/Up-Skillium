import useTittleDescAnimation from "@/hooks/useTittleDescAnimation";
import { motion } from "framer-motion";
import { useRef } from "react";

const PopularCourseHeader = () => {
  const ref = useRef(null);
  const { title, desc } = useTittleDescAnimation(ref);
  return (
    <div ref={ref} className="flex flex-col justify-center items-center">
      <motion.h1
        {...title}
        className="text-lg lg:text-3xl text-center font-bold"
      >
        Explore Our Most Popular Courses
      </motion.h1>
      <motion.p
        {...desc}
        className="text-sm lg:text-lg w-full lg:w-1/2 mx-auto text-center text-gray-300 mt-4"
      >
        Discover top-rated courses crafted by industry experts. <br /> Boost
        your skills and career with our best-selling programs.
      </motion.p>
    </div>
  );
};

export default PopularCourseHeader;
