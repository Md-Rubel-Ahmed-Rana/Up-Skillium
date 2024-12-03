import useTittleDescAnimation from "@/hooks/useTittleDescAnimation";
import { motion } from "framer-motion";
import { useRef } from "react";

const TeamHeader = () => {
  const ref = useRef(null);
  const { title, desc } = useTittleDescAnimation(ref);
  return (
    <div ref={ref} className="text-center mb-10">
      <motion.h2 {...title} className="text-3xl font-bold text-center mb-3">
        Our Skilled Team at Your Service
      </motion.h2>
      <motion.p
        {...desc}
        className="w-full lg:w-1/2 mx-auto text-center text-gray-300 text-lg"
      >
        Over 130 dedicated professionals drive our success through their
        expertise, collaboration, and innovation, ensuring we lead in our
        industry.
      </motion.p>
    </div>
  );
};

export default TeamHeader;
