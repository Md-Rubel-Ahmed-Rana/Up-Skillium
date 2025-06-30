import { IUser } from "@/types/user.type";
import SectionHeader from "../home/SectionHeader";
import SuccessfulStudents from "./SuccessfulStudents";

type Props = {
  students: IUser[];
};

const Alumni = ({ students }: Props) => {
  return (
    <div className="p-2  mb-20 lg:p-4 flex flex-col gap-5 lg:gap-8">
      <SectionHeader
        titleText="Empowering Our Successful Alumni"
        descText="Discover the inspiring stories of students who have transformed their
            careers and lives through dedication, learning, and achievement at Up
            Skillium."
        titleStyles="text-gray-800 my-3 text text-2xl font-bold text-center"
        descStyles="text-gray-500 text-lg lg:w-1/2 w-auto mx-auto text-center"
      />
      <SuccessfulStudents students={students} />
    </div>
  );
};

export default Alumni;
