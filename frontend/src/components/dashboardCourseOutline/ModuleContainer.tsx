/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "antd/lib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FiMove } from "react-icons/fi";
import { IModuleOutline } from "@/types/courseOutline.type";
import ModuleEditModal from "../courseDetails/courseOutline/ModuleEditModal";

type Props = {
  modules: IModuleOutline[];
};

const ModuleContainer = ({ modules }: Props) => {
  const [moduleList, setModuleList] = useState<IModuleOutline[]>(modules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableModule, setEditableModule] = useState<IModuleOutline | null>(
    null
  );

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedModules = Array.from(moduleList);
    const [removed] = reorderedModules.splice(result.source.index, 1);
    reorderedModules.splice(result.destination.index, 0, removed);

    setModuleList(reorderedModules);
  };

  const handleEditModule = (module: IModuleOutline) => {
    setEditableModule(module);
    setIsModalOpen(true);
  };

  // Delete a module
  const handleDelete = (id: string) => {
    setModuleList((prev) => prev.filter((mod) => mod.id !== id));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Module List</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="modules">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {moduleList.map((module, index) => (
                <Draggable
                  key={module?.id}
                  draggableId={module?.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="p-3 bg-white rounded-lg shadow flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Module-{index + 1}: </span>
                        <span>{module?.name}</span>
                      </div>
                      <div className="space-x-2 flex items-center">
                        {/* Drag Handle Icon */}
                        <div {...provided.dragHandleProps}>
                          <FiMove
                            className="cursor-grab text-gray-500"
                            size={20}
                          />
                        </div>
                        <Button
                          size="small"
                          type="link"
                          onClick={() => handleEditModule(module)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          type="link"
                          danger
                          onClick={() => handleDelete(module?.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ModuleEditModal
        module={editableModule as IModuleOutline}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      />
    </div>
  );
};

export default ModuleContainer;
