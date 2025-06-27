import successStudentsData from "@/constants/successStudents";
import { Pagination } from "antd/lib";
import { useState } from "react";
import StudentCard from "./StudentCard";

const SuccessfulStudents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const paginatedInstructors = successStudentsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div>
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {paginatedInstructors.map((student) => (
          <StudentCard student={student} key={student?.id} />
        ))}
      </div>

      <div className="w-full flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={successStudentsData.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SuccessfulStudents;
