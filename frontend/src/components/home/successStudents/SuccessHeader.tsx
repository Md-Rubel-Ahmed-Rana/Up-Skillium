import useTittleDescAnimation from "@/hooks/useTittleDescAnimation";
import { motion } from "framer-motion";
import { useRef } from "react";

const SuccessHeader = () => {
  const ref = useRef(null);
  const { title, desc } = useTittleDescAnimation(ref);

  return (
    <div ref={ref}>
      <motion.h1 {...title} className="text-3xl font-bold text-center mb-3">
        Empowering Our Successful Alumni
      </motion.h1>
      <motion.p
        className="w-full lg:w-1/2 mx-auto text-center text-gray-300 text-lg"
        {...desc}
      >
        Discover the inspiring stories of students who have transformed their
        careers and lives through dedication, learning, and achievement at Up
        Skillium.
      </motion.p>
    </div>
  );
};

export default SuccessHeader;
