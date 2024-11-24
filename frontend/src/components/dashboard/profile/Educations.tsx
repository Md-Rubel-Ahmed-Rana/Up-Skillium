import EducationTable from "@/components/educations";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllEducationsByUserQuery } from "@/features/education";
import { IEducation } from "@/types/education.type";
import { IUser } from "@/types/user.type";
import AddEducationButton from "./AddEducationButton";

const Educations = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetAllEducationsByUserQuery({
    userId: user?.id,
  });

  const educations = (data?.data || []) as IEducation[];

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-lg lg:text-2xl font-semibold">Educations</h2>
        <AddEducationButton />
      </div>
      <div className="overflow-x-auto">
        <EducationTable educations={educations} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Educations;
