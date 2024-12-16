import { useGetAllModulesQuery } from "@/features/module";
import { IGetModule } from "@/types/module.type";
import ModulesTable from "../modules";

const ManageModules = () => {
  const { data, isLoading } = useGetAllModulesQuery({});
  const modules = data?.data as IGetModule[];

  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">Manage Modules</h2>
      <ModulesTable isLoading={isLoading} modules={modules} />
    </div>
  );
};

export default ManageModules;
