import { ITeamMember } from "@/types/instructor";

type Props = {
  member: ITeamMember;
};

const MemberCard = ({ member }: Props) => {
  return (
    <div
      className="relative p-2 overflow-hidden h-[290px] w-full min-w-[280px] max-w-[350px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
      key={member?.id}
    >
      <img
        src={member?.image}
        alt={"member image"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 p-4">
        <h3 className="text-xl font-semibold mb-2">{member?.name}</h3>
        <p className="text-lg font-medium opacity-80">{member?.designation}</p>
      </div>
    </div>
  );
};

export default MemberCard;
