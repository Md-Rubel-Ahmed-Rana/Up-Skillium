import {
  ICourseOutlineModuleSerialUpdate,
  IModuleOutline,
} from "@/types/courseOutline.type";

const handleCourseOutlineDragEndDrop = (
  sourceIndex: number,
  destinationIndex: number,
  modules: IModuleOutline[]
): ICourseOutlineModuleSerialUpdate => {
  const sourceItem = modules[sourceIndex];
  const sourceObject = {
    serialNumber: sourceIndex + 1,
    moduleId: sourceItem?.id,
  };

  const destinationItem = modules[destinationIndex];
  const destinationObject = {
    serialNumber: destinationIndex + 1,
    moduleId: destinationItem?.id,
  };
  return { sourceObject, destinationObject };
};

export default handleCourseOutlineDragEndDrop;
