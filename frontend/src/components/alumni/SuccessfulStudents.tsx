import { coursesData } from "@/constants/courses";
import { Student } from "@/types/student.type";
import { IUser } from "@/types/user.type";
import { Pagination } from "antd/lib";
import { useState } from "react";
import StudentCard from "../home/successStudents/StudentCard";

type Props = {
  students: IUser[];
};

const SuccessfulStudents = ({ students }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const studentData: Student[] = students.map((student) => ({
    id: student?.id || student?._id,
    name: student.name,
    image: student.image,
    course: coursesData[Math.floor(Math.random() * coursesData.length)],
    score: Math.floor(Math.random() * (100 - 20 + 1)) + 20,
  }));

  const paginatedStudents = studentData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div>
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {paginatedStudents.map((student) => (
          <StudentCard student={student} key={student?.id} />
        ))}
      </div>

      <div className="w-full flex justify-center mt-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={students.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SuccessfulStudents;
