import { instructors } from "@/constants/teamMembers";
import { Pagination } from "antd/lib";
import { useState } from "react";
import SectionHeader from "../home/SectionHeader";
import MemberCard from "../home/team/MemberCard";

const InstructorTeam = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const paginatedInstructors = instructors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-2  mb-20 lg:p-4 flex flex-col gap-5 lg:gap-8">
      <SectionHeader
        titleText="Our Skilled Team at Your Service"
        descText=" Over 130 dedicated professionals drive our success through their
        expertise, collaboration, and innovation, ensuring we lead in our
        industry."
        titleStyles="text-gray-800 my-3 text text-2xl font-bold text-center"
        descStyles="text-gray-500 text-lg lg:w-1/2 w-auto mx-auto text-center"
      />

      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {paginatedInstructors.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      <div className="w-full flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={instructors.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default InstructorTeam;
