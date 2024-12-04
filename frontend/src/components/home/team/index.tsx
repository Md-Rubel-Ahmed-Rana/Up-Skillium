import teamMembersData from "@/constants/teamMembers";
import dynamic from "next/dynamic";
import TeamHeader from "./TeamHeader";

const TeamMembers = dynamic(() => import("./TeamMembers"), { ssr: false });

const TeamContainer = () => {
  const midpoint = Math.ceil(teamMembersData.length / 2);

  return (
    <div className="relative flex flex-col gap-6 border-t border-gray-400 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-2">
      <TeamHeader />
      <TeamMembers
        members={teamMembersData.slice(0, midpoint)}
        direction="right-to-left"
      />
      <TeamMembers
        members={teamMembersData.slice(midpoint)}
        direction="left-to-right"
      />
    </div>
  );
};

export default TeamContainer;
