import successStudentsData from "@/constants/successStudents";
import { Button } from "antd/lib";
import Link from "next/link";
import StudentCard from "./StudentCard";
import SuccessHeader from "./SuccessHeader";

const SuccessStudents = () => {
  return (
    <div className="relative  flex flex-col gap-6 border-t border-gray-400 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-2">
      <SuccessHeader />
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {successStudentsData.slice(0, 9).map((student) => (
          <StudentCard student={student} key={student?.id} />
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <Link href={"/success-stories"}>
          <Button className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold  rounded-lg shadow-lg px-10 py-1 hover:shadow-xl hover:from-purple-700  hover:to-purple-700 transition-all duration-300">
            Explore more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessStudents;
