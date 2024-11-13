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
    <div className="p-3 bg-white rounded-lg shadow flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span>Module-{index + 1}: </span>
        <span>{module?.name}</span>
      </div>
      <div className="space-x-2 flex items-center">
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
