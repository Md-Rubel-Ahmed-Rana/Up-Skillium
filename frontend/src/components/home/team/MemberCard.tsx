import { IUser } from "@/types/user.type";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  member: IUser;
};

const overlayVariants = {
  hidden: { y: "100%" },
  visible: { y: "0%" },
};

const MemberCard = ({ member }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileHover={!isMobile ? "visible" : undefined}
      animate={isMobile && isInView ? "visible" : "hidden"}
      className="relative overflow-hidden h-[290px] w-full rounded-xl shadow-lg cursor-pointer"
    >
      <motion.img
        src={member?.image}
        alt="member image"
        className="w-full h-full object-cover"
        whileHover={!isMobile ? { scale: 1.05 } : undefined}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        variants={overlayVariants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-md text-gray-700 bg-gray-100"
      >
        <h3 className="text-xl font-semibold">{member?.name}</h3>
        <p className="text-sm opacity-80">{member?.role?.name}</p>
      </motion.div>
    </motion.div>
  );
};

export default MemberCard;
