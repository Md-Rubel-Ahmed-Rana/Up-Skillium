export type Student = {
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
    <div className="px-2 py-5 border border-gray-200 shadow-md rounded-md flex flex-col items-center w-full">
      <img
        className="h-40 w-40 rounded-full border"
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
