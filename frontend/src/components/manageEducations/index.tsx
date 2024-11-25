import { useGetAllEducationsQuery } from "@/features/education";
import { IEducation } from "@/types/education.type";
import EducationTable from "../educations";

const ManageEducations = () => {
  const { data, isLoading } = useGetAllEducationsQuery({});
  const educations = (data?.data || []) as IEducation[];

  return (
    <div className="mt-4">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Manage Educations
      </h2>
      <div className="overflow-x-auto">
        <EducationTable educations={educations} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ManageEducations;
