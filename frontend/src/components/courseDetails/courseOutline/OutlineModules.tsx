import { IModuleOutline } from "@/types/courseOutline.type";
import { Typography } from "antd/lib";

type Props = {
  modules: IModuleOutline[];
};

const OutlineModules = ({ modules }: Props) => {
  return (
    <div className="lg:p-8 mt-10 lg:mt-0 lg:bg-gray-50">
      <div className="space-y-6">
        <div className="text-center">
          <Typography.Title level={2} className="text-blue-600">
            Outline of the Course
          </Typography.Title>
          <Typography.Text className="text-gray-500">
            Dive into the modules covered in this course
          </Typography.Text>
        </div>
        <ul className="flex flex-col gap-2">
          {modules?.map((module, index) => (
            <li
              className="bg-white p-2 rounded-md font-serif text-xs"
              key={module?.id}
            >
              {`Module-${index + 1} : ${module?.name}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OutlineModules;