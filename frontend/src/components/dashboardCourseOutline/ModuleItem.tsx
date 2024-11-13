/* eslint-disable @typescript-eslint/no-explicit-any */
import { IModuleOutline } from "@/types/courseOutline.type";
import { FiMove } from "react-icons/fi";
import ModuleEditButton from "./ModuleEditButton";
import ModuleDeleteButton from "./ModuleDeleteButton";

type Props = {
  module: IModuleOutline;
  index: number;
  dragHandleProps: any;
};

const ModuleItem = ({ module, index, dragHandleProps }: Props) => {
  return (
    <div className="lg:p-3 p-1 bg-white rounded-lg shadow flex flex-col lg:flex-row items-center justify-between">
      <div className="flex text-sm lg:text-md font-serif  w-full items-center space-x-2">
        <span>
          Module-{index + 1}: {module?.name}
        </span>
      </div>
      <div className="space-x-2 mt-2 lg:mt-0 flex items-center">
        <div {...dragHandleProps}>
          <FiMove className="cursor-grab text-gray-500" size={20} />
        </div>
        <ModuleEditButton module={module} />
        <ModuleDeleteButton module={module} />
      </div>
    </div>
  );
};

export default ModuleItem;
