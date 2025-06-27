import teamMembersData from "@/constants/teamMembers";
import { Button } from "antd/lib";
import Link from "next/link";
import MemberCard from "./MemberCard";
import TeamHeader from "./TeamHeader";

const TeamContainer = () => {
  return (
    <div className="flex flex-col gap-6 border-t border-gray-400 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-2">
      <TeamHeader />

      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {teamMembersData.slice(0, 6).map((member) => (
          <MemberCard key={member?.id} member={member} />
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <Link href={"/team"}>
          <Button className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold  rounded-lg shadow-lg px-10 py-1 hover:shadow-xl hover:from-purple-700  hover:to-purple-700 transition-all duration-300">
            Explore more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TeamContainer;
