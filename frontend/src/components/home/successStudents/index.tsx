import { coursesData } from "@/constants/courses";
import { IUser } from "@/types/user.type";
import { Button } from "antd/lib";
import Link from "next/link";
import StudentCard, { Student } from "./StudentCard";
import SuccessHeader from "./SuccessHeader";

type Props = {
  students: IUser[];
};

const SuccessStudents = ({ students }: Props) => {
  const studentData: Student[] = students.map((student) => ({
    id: student?.id || student?._id,
    name: student.name,
    image: student.image,
    course: coursesData[Math.floor(Math.random() * coursesData.length)],
    score: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
  }));

  return (
    <div className="relative  flex flex-col gap-6 py-20 px-2">
      <SuccessHeader />
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {studentData.slice(0, 12).map((student) => (
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
