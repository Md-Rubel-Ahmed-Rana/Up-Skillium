import { useGetLoggedInUserQuery } from "@/features/auth";
import {
  useGetAllModulesByInstructorQuery,
  useGetAllModulesQuery,
} from "@/features/module";
import { IGetModule } from "@/types/module.type";
import { IUser } from "@/types/user.type";
import { Select, Spin } from "antd/lib";
import { useRouter } from "next/router";

const { Option } = Select;

const ModuleDropdown = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data: instructorModuleData, isLoading: isLoading1 } =
    useGetAllModulesByInstructorQuery({
      instructorId: user?.id,
    });
  const instructorModules = instructorModuleData?.data as IGetModule[];
  const { data, isLoading: isLoading2 } = useGetAllModulesQuery({});
  const adminModules = data?.data as IGetModule[];
  const router = useRouter();

  const modules =
    user?.role?.name === "admin" ? adminModules : instructorModules;

  const handleSelect = (moduleId: string) => {
    const selectedModule = modules.find((module) => module?.id === moduleId);
    const path = `/dashboard/create-lesson?courseId=${selectedModule?.course?.id}&moduleId=${selectedModule?.id}&courseName=${selectedModule?.course?.title}&moduleName=${selectedModule?.title}`;
    router.push(path);
  };

  return (
    <div className="w-full">
      <Select
        showSearch
        placeholder="Search for a module..."
        optionFilterProp="children"
        onSelect={(value) => {
          handleSelect(value);
        }}
        allowClear={true}
        loading={isLoading1 || isLoading2}
        filterOption={(input, option) =>
          (option?.title ?? "").toLowerCase().includes(input.toLowerCase())
        }
        className="w-full my-4"
        notFoundContent={
          isLoading1 || isLoading2 ? <Spin size="small" /> : "No modules found"
        }
      >
        {modules?.map((module) => (
          <Option
            className="border mb-2"
            key={module?.id}
            value={module?.id}
            title={module?.title}
          >
            <div className="flex flex-col ">
              <span className="font-semibold">{module?.title}</span>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ModuleDropdown;
