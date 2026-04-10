import { IUser } from "@/types/user.type";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type Props = {
  member: IUser;
};

const MemberCard = ({ member }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isInView]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group rounded-2xl overflow-hidden shadow-xl bg-white transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
    >
      <motion.img
        src={member?.image}
        alt={member?.name}
        className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500" />

      <div className="absolute bottom-0 left-0 w-full text-white p-5 z-10">
        <h3 className="text-xl font-semibold">{member?.name}</h3>
        <p className="text-sm text-gray-300">
          {member?.designation || member?.role?.name}
        </p>
      </div>

      {member?.role?.name && (
        <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs rounded-full shadow">
          {member.role.name}
        </div>
      )}
    </motion.div>
  );
};

export default MemberCard;
