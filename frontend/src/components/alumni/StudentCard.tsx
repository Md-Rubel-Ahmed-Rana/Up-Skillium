const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.02, boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" },
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
  return (
    <div className="p-2 border border-gray-400 rounded-md h-[290px] w-full">
      <img
        className="h-40 w-full rounded-md"
        src={student?.image}
        alt={student?.name}
      />
      <h3 className="text-xl font-bold mt-3">{student?.name}</h3>
      <p>Score: {student?.score}</p>
      <p>{student?.course}</p>
    </div>
  );
};

export default StudentCard;
