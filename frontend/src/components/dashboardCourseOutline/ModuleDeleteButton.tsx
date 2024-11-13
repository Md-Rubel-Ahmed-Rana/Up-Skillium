/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button } from "antd/lib";
import { IModuleOutline } from "@/types/courseOutline.type";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDeleteCourseOutlineModuleMutation } from "@/features/courseOutline";
import { useRouter } from "next/router";

type Props = {
  module: IModuleOutline;
};

const ModuleDeleteButton = ({ module }: Props) => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const [open, setOpen] = useState(false);
  const [deleteModule, { isLoading }] = useDeleteCourseOutlineModuleMutation();

  const handleDeleteModule = async () => {
    try {
      const result: any = await deleteModule({
        courseId,
        moduleId: module?.id,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Module deleted successfully!");
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to delete module."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to delete module. Error: ${error?.message}`);
    }
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} size="small" type="link" danger>
        Delete
      </Button>
      <Modal
        okButtonProps={{ disabled: isLoading }}
        cancelButtonProps={{ disabled: isLoading }}
        confirmLoading={isLoading}
        maskClosable={!isLoading}
        closable={!isLoading}
        open={open}
        title="Delete Module"
        footer={null}
      >
        <p>Are you sure you want to delete the module : {module?.name}?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button disabled={isLoading} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            loading={isLoading}
            iconPosition="end"
            onClick={handleDeleteModule}
            type="primary"
            danger
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModuleDeleteButton;
