import EducationTable from "@/components/educations";
import { useGetAllEducationsByUserQuery } from "@/features/education";
import { IEducation } from "@/types/education.type";
import AddEducationButton from "./AddEducationButton";

type Props = {
  userId: string;
  isProfileOwner: boolean;
};

const Educations = ({ userId, isProfileOwner }: Props) => {
  const { data, isLoading } = useGetAllEducationsByUserQuery({
    userId,
  });

  const educations = (data?.data || []) as IEducation[];

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-lg lg:text-2xl font-semibold">Educations</h2>
        {isProfileOwner && <AddEducationButton />}
      </div>
      <div className="overflow-x-auto">
        <EducationTable
          educations={educations}
          isLoading={isLoading}
          isProfileOwner={isProfileOwner}
        />
      </div>
    </div>
  );
};

export default Educations;
