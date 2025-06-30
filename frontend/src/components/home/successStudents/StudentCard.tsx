import { Student } from "@/types/student.type";
import { Avatar } from "antd/lib";
import { motion } from "framer-motion";

type Props = {
  student: Student;
};

const StudentCard = ({ student }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-full flex flex-col items-center text-center gap-4 transition-all duration-300"
    >
      {student?.image ? (
        <img
          src={student?.image}
          alt={student?.name}
          className="h-28 w-28 object-cover rounded-full border-4 border-blue-500 shadow-md"
        />
      ) : (
        <Avatar className="h-28 w-28 text-4xl rounded-full border-4 border-blue-500 shadow-md">
          {student.name
            .split(" ")
            .map((word) => word.slice(0, 1).toUpperCase())}
        </Avatar>
      )}

      <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>

      <p className="text-sm text-gray-500">{student.course}</p>

      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
        Score: {student.score}
      </div>
    </motion.div>
  );
};

export default StudentCard;
