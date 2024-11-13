import { IModuleOutline } from "@/types/courseOutline.type";

type IDragEnd = {
  sourceObject: { sourceIndex: number; moduleId: string };
  destinationObject: {
    destinationIndex: number;
    moduleId: string;
  };
};

const handleCourseOutlineDragEndDrop = (
  sourceIndex: number,
  destinationIndex: number,
  modules: IModuleOutline[]
): IDragEnd => {
  const sourceItem = modules[sourceIndex];
  const sourceObject = { sourceIndex, moduleId: sourceItem?.id };

  const destinationItem = modules[destinationIndex];
  const destinationObject = {
    destinationIndex,
    moduleId: destinationItem?.id,
  };
  return { sourceObject, destinationObject };
};

export default handleCourseOutlineDragEndDrop;
