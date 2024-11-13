import { IModule } from "@/types/module.type";
import { Collapse, CollapseProps } from "antd/lib";
import LessonItem from "./LessonItem";
import { BiError } from "react-icons/bi";

type Props = {
  modules: IModule[];
};

const ModulesContainer = ({ modules }: Props) => {
  const moduleList: CollapseProps["items"] = modules?.map((module, index) => ({
    key: module?.id,
    label: (
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">
          Module-{index + 1} : {module?.title}
        </h4>
        <span>{module?.lessons?.length} Lessons</span>
      </div>
    ),
    children: (
      <div className="flex flex-col gap-2">
        {module?.lessons?.map((lesson) => (
          <LessonItem key={lesson?.id} lesson={lesson} />
        ))}
      </div>
    ),
  }));

  return (
    <div>
      {moduleList?.length <= 0 ? (
        <div className="">
          <h2></h2>
          <div className="max-w-md w-full mx-auto flex flex-col justify-center items-center text-center p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
            <BiError className="text-6xl text-red-400 mb-4" />
            <p className="text-lg text-gray-600 font-semibold">
              No modules & lessons found!
            </p>
            <p className="text-gray-500">Try selecting another course</p>
          </div>
        </div>
      ) : (
        <Collapse items={moduleList} />
      )}
    </div>
  );
};

export default ModulesContainer;
