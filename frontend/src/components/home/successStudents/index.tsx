import successStudentsData from "@/constants/successStudents";
import StudentContainer from "./StudentContainer";
import SuccessHeader from "./SuccessHeader";

const SuccessStudents = () => {
  const firsts = successStudentsData.slice(
    0,
    Math.ceil(successStudentsData.length / 3)
  );
  const seconds = successStudentsData.slice(
    Math.ceil(successStudentsData.length / 3),
    Math.ceil((successStudentsData.length * 2) / 3)
  );
  const thirds = successStudentsData.slice(
    Math.ceil((successStudentsData.length * 2) / 3)
  );

  return (
    <div className="relative  flex flex-col gap-6 border-t border-gray-400 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-2">
      <SuccessHeader />
      <StudentContainer direction="left-to-right" students={firsts} />
      <StudentContainer direction="right-to-left" students={seconds} />
      <StudentContainer direction="left-to-right" students={thirds} />
    </div>
  );
};

export default SuccessStudents;
