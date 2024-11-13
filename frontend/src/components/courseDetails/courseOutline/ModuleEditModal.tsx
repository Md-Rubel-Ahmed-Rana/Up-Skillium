import { IModuleOutline } from "@/types/courseOutline.type";
import { Input, Modal } from "antd/lib";
import { useState } from "react";

type Props = {
  module: IModuleOutline;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModuleEditModal = ({ open, setOpen, module }: Props) => {
  const [newModuleName, setNewModuleName] = useState("");

  const handleUpdateModule = () => {
    setOpen(true);
  };

  return (
    <Modal
      title="Edit Module"
      open={open}
      onOk={handleUpdateModule}
      okText="Save changes"
      onCancel={() => setOpen(false)}
    >
      <Input
        value={newModuleName || module?.name}
        onChange={(e) => setNewModuleName(e.target.value)}
        placeholder="Module Name"
      />
    </Modal>
  );
};

export default ModuleEditModal;
