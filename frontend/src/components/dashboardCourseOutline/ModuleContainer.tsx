import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModuleItem from "./ModuleItem";
import {
  ICourseOutlineModuleSerialUpdate,
  IModuleOutline,
} from "@/types/courseOutline.type";
import { useEffect, useState } from "react";
import handleCourseOutlineDragEndDrop from "@/utils/handleCourseOutlineDragEndDrop";
import { useUpdateCourseOutlineModuleSerialMutation } from "@/features/courseOutline";
import toast from "react-hot-toast";

type Props = {
  modules: IModuleOutline[];
  courseId: string;
};

const ModuleContainer = ({ modules: initialModules, courseId }: Props) => {
  const [modules, setModules] = useState<IModuleOutline[]>(initialModules);
  const [updateSerial] = useUpdateCourseOutlineModuleSerialMutation();

  const handleDragEnd = async (result: any) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    // find the source and destination item then update local state
    const updatedModules = Array.from(modules);
    const [movedItem] = updatedModules.splice(source.index, 1);
    updatedModules.splice(destination.index, 0, movedItem);
    setModules(updatedModules);

    // organize/make source and destination item to send server/api call
    const droppedData = handleCourseOutlineDragEndDrop(
      source?.index,
      destination?.index,
      initialModules
    );
    await handleUpdateModuleSerialNumber(droppedData);
  };

  const handleUpdateModuleSerialNumber = async (
    data: ICourseOutlineModuleSerialUpdate
  ) => {
    try {
      const result: any = await updateSerial({ courseId, data });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Modules serial updated successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update modules serial."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update modules serial. Error: ${error?.message}`);
    }
  };

  useEffect(() => {
    setModules(initialModules);
  }, [initialModules]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="lg:p-4 p-2 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Module List</h2>
        <Droppable droppableId={courseId}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {modules?.map((module, index) => (
                <Draggable
                  key={module?.id.toString()}
                  draggableId={module?.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <ModuleItem
                        module={module}
                        index={index}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default ModuleContainer;
