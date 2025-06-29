import successStudentsData from "@/constants/successStudents";
import { Button } from "antd/lib";
import Link from "next/link";
import StudentCard from "./StudentCard";
import SuccessHeader from "./SuccessHeader";

const SuccessStudents = () => {
  return (
    <div className="relative  flex flex-col gap-6 py-20 px-2">
      <SuccessHeader />
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {successStudentsData.slice(0, 9).map((student) => (
          <StudentCard student={student} key={student?.id} />
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <Link href={"/success-stories"}>
          <Button className="inline-block font-semibold  rounded-lg shadow-lg px-10 py-1  transition-all duration-300">
            Explore more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessStudents;
