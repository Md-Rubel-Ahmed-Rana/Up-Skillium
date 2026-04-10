import { useDeleteModuleMutation } from "@/features/module";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  moduleTitle: string;
  moduleId: string;
  isButton?: boolean;
  buttonSize?: "small" | "middle" | "large";
  buttonText?: string;
  buttonType?: "primary" | "default" | "dashed" | "link" | "text";
  buttonStyles?: string;
  spanStyles?: string;
};

const DeleteModuleModal = ({
  moduleId,
  moduleTitle,
  buttonSize,
  buttonStyles,
  buttonText = "Delete",
  buttonType = "primary",
  isButton,
  spanStyles,
}: Props) => {
  const [show, setShow] = useState(false);
  const [deleteModule, { isLoading }] = useDeleteModuleMutation();

  const handleDeleteModule = async () => {
    try {
      const response: any = await deleteModule({ moduleId });
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message);
        setShow(false);
      } else {
        toast.error(
          response?.data?.message ||
            response?.data?.error?.message ||
            response?.error?.message ||
            "Failed to delete module"
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.data?.error?.message ||
          error?.error?.message ||
          "Failed to delete module"
      );
    }
  };

  return (
    <>
      {isButton ? (
        <Button
          type={buttonType}
          size={buttonSize}
          onClick={() => setShow(true)}
          className={buttonStyles}
          danger
        >
          {buttonText}
        </Button>
      ) : (
        <span onClick={() => setShow(true)} className={spanStyles}>
          {buttonText}
        </span>
      )}

      <Modal
        title={`Delete '${moduleTitle}' Module`}
        open={show}
        onCancel={() => setShow(false)}
        okText={isLoading ? "Deleting..." : "Delete"}
        okButtonProps={{
          danger: true,
          loading: isLoading,
          disabled: isLoading,
          iconPosition: "end",
        }}
        onOk={handleDeleteModule}
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
      >
        <p>
          Are you sure you want to delete <b>{`'${moduleTitle}'`}</b> module?
        </p>
      </Modal>
    </>
  );
};

export default DeleteModuleModal;
