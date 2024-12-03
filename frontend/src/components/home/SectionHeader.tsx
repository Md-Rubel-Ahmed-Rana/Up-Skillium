import useTittleDescAnimation from "@/hooks/useTittleDescAnimation";
import { motion } from "framer-motion";
import { useRef } from "react";

type Props = {
  titleText: string;
  descText: string;
  titleStyles?: string;
  descStyles?: string;
};

const SectionHeader = ({
  titleText,
  descText,
  titleStyles,
  descStyles,
}: Props) => {
  const ref = useRef(null);
  const { title, desc } = useTittleDescAnimation(ref);
  return (
    <div ref={ref}>
      <motion.h2
        {...title}
        className={
          titleStyles
            ? titleStyles
            : "text-xl lg:text-3xl font-bold text-white text-center mb-3"
        }
      >
        {titleText}
      </motion.h2>
      <motion.p
        {...desc}
        className={
          descStyles
            ? descStyles
            : "w-full lg:w-1/2 mx-auto text-center text-gray-300 text-sm lg:text-lg"
        }
      >
        {descText}
      </motion.p>
    </div>
  );
};

export default SectionHeader;
