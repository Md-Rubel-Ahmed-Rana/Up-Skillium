import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" },
};

type Student = {
  id: string;
  name: string;
  image: string;
  course: string;
  score: number;
};

type Props = {
  student: Student;
};

const StudentCard = ({ student }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  console.log(`${student.name} is ${isInView ? "in view" : "out of view"}`);

  return (
    <motion.div
      ref={ref}
      className="p-2 border border-gray-400 rounded-md h-[290px] w-full min-w-[280px] max-w-[350px]  bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
    >
      <img
        className="h-40 w-full rounded-md"
        src={student?.image}
        alt={student?.name}
      />
      <h3>{student?.name}</h3>
      <p>Score: {student?.score}</p>
      <p>Course: {student?.course}</p>
    </motion.div>
  );
};

export default StudentCard;
