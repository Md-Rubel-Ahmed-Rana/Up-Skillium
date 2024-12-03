import useTittleDescAnimation from "@/hooks/useTittleDescAnimation";
import { motion } from "framer-motion";
import { useRef } from "react";

const BenefitOpportunitiesHeader = () => {
  const ref = useRef(null);
  const { title, desc } = useTittleDescAnimation(ref);
  return (
    <div ref={ref} className="text-center py-8 -mb-28 lg:-mb-36">
      <motion.h1 {...title} className="text-xl lg:text-4xl font-bold">
        Unlock Endless Opportunities
      </motion.h1>
      <motion.p
        {...desc}
        className="text-sm lg:text-lg w-full lg:w-1/2 mx-auto text-center mt-4 text-gray-300"
      >
        Join a world-class learning experience designed to help you achieve your
        dreams. From globally recognized certifications to career-changing
        connections, the possibilities are limitless.
      </motion.p>
    </div>
  );
};

export default BenefitOpportunitiesHeader;
