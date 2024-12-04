import { useUpdateModuleNameMutation } from "@/features/courseOutline";
import { IModuleOutline } from "@/types/courseOutline.type";
import { Button, Input, Modal } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  module: IModuleOutline;
};

const ModuleEditButton = ({ module }: Props) => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const [newModuleName, setNewModuleName] = useState("");
  const [open, setOpen] = useState(false);
  const [updateName, { isLoading }] = useUpdateModuleNameMutation();

  const handleEditModule = async () => {
    try {
      const result: any = await updateName({
        courseId,
        moduleId: module?.id,
        updateName: newModuleName,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Module name updated successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update module name."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update module name. Error: ${error?.message}`);
    }
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
        okButtonProps={{ disabled: isLoading }}
        cancelButtonProps={{ disabled: isLoading }}
        confirmLoading={isLoading}
        maskClosable={!isLoading}
        closable={!isLoading}
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
