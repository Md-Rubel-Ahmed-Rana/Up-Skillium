/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModuleItem from "./ModuleItem";
import { IModuleOutline } from "@/types/courseOutline.type";
import { useEffect, useState } from "react";
import handleCourseOutlineDragEndDrop from "@/utils/handleCourseOutlineDragEndDrop";

type Props = {
  modules: IModuleOutline[];
  courseId: string;
};

const ModuleContainer = ({ modules: initialModules, courseId }: Props) => {
  const [modules, setModules] = useState<IModuleOutline[]>(initialModules);

  const handleDragEnd = (result: any) => {
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
    console.log(droppedData);
  };

  useEffect(() => {
    setModules(initialModules);
  }, [initialModules]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
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
