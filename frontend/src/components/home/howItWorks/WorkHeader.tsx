import useTittleDescAnimation from "@/hooks/useTittleDescAnimation";
import { motion } from "framer-motion";
import { useRef } from "react";

const WorkHeader = () => {
  const ref = useRef(null);
  const { title, desc } = useTittleDescAnimation(ref);

  return (
    <div ref={ref} className="text-center mb-10">
      <motion.h2 {...title} className="text-3xl font-bold text-center mb-3">
        How <span className="text-yellow-300">Up Skillium</span> Works
      </motion.h2>
      <motion.p
        {...desc}
        className="w-full lg:w-1/2 mx-auto text-center text-gray-300 text-lg"
      >
        We focus on delivering personalized and practical learning experiences.
        Our platform combines expertly crafted courses, hands-on projects, and
        real-world insights to empower students to achieve their goals and
        advance their careers.
      </motion.p>
    </div>
  );
};

export default WorkHeader;
