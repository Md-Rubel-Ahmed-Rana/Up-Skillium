import { instructors } from "@/constants/teamMembers";
import { Button } from "antd/lib";
import Link from "next/link";
import MemberCard from "./MemberCard";
import TeamHeader from "./TeamHeader";

const TeamContainer = () => {
  return (
    <div className="flex flex-col gap-6  py-20 px-2">
      <TeamHeader />

      <div className="max-w-[1220px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {instructors.slice(0, 6).map((member) => (
          <MemberCard key={member?.id} member={member} />
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <Link href={"/team"}>
          <Button className="inline-block font-semibold  rounded-lg shadow-md px-10 py-1 hover:shadow-lg transition-all duration-300">
            Explore more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TeamContainer;
