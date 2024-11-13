import { Modal, Button } from "antd/lib";
import { IModuleOutline } from "@/types/courseOutline.type";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  module: IModuleOutline;
};

const ModuleDeleteButton = ({ module }: Props) => {
  const [open, setOpen] = useState(false);
  const handleDeleteModule = () => {
    toast.success(`${module?.name} has been deleted!`);
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} size="small" type="link" danger>
        Delete
      </Button>
      <Modal open={open} title="Delete Module" footer={null}>
        <p>Are you sure you want to delete the module : {module?.name}?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteModule} type="primary" danger>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModuleDeleteButton;
