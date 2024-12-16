import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllModulesByInstructorQuery } from "@/features/module";
import { IGetModule } from "@/types/module.type";
import { IUser } from "@/types/user.type";
import ModulesTable from "../modules";

const InstructorModules = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetAllModulesByInstructorQuery({
    instructorId: user?.id,
  });
  const modules = data?.data as IGetModule[];
  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Modules of Courses
      </h2>
      <ModulesTable isLoading={isLoading} modules={modules} />
    </div>
  );
};

export default InstructorModules;
