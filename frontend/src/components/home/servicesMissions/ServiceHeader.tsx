import useTittleDescAnimation from "@/hooks/useTittleDescAnimation";
import { motion } from "framer-motion";
import { useRef } from "react";

const ServiceHeader = () => {
  const ref = useRef(null);
  const { title, desc } = useTittleDescAnimation(ref);
  return (
    <div ref={ref}>
      <motion.h1
        {...title}
        className="text-xl lg:text-4xl font-bold text-center text-white mb-4"
      >
        Our Dedicated Services & Mission
      </motion.h1>
      <motion.p
        {...desc}
        className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
      >
        Empowering learners with comprehensive services designed to transform
        education into a journey of growth and success. Explore how our platform
        goes beyond traditional learning to support every step of your
        educational journey.
      </motion.p>
    </div>
  );
};

export default ServiceHeader;
