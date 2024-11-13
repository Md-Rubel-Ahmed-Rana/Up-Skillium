import { IModuleOutline } from "@/types/courseOutline.type";
import { Button, Input, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  module: IModuleOutline;
};

const ModuleEditButton = ({ module }: Props) => {
  const [newModuleName, setNewModuleName] = useState("");
  const [open, setOpen] = useState(false);

  const handleEditModule = () => {
    toast.success(`${newModuleName || module?.name} has been updated!`);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} size="small" type="link">
        Edit
      </Button>
      <Modal
        open={open}
        onOk={handleEditModule}
        title="Edit Module"
        okText="Save changes"
        onCancel={() => setOpen(false)}
      >
        <Input
          value={newModuleName || module?.name}
          onChange={(e) => setNewModuleName(e.target.value)}
          placeholder="Module Name"
        />
      </Modal>
    </>
  );
};

export default ModuleEditButton;
