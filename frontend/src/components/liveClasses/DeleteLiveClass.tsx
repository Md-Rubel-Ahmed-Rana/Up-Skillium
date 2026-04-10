import { useDeleteLiveClassMutation } from "@/features/liveClass";
import { IGetLiveClass } from "@/types/liveClass.type";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  liveClass: IGetLiveClass;
};

const DeleteLiveClass = ({ liveClass }: Props) => {
  const [isDeleteClass, setIsDeleteClass] = useState(false);
  const [deleteLiveClass, { isLoading }] = useDeleteLiveClassMutation();

  const handleDeleteLiveClass = async () => {
    try {
      const response: any = await deleteLiveClass({ id: liveClass?.id });
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message);
        setIsDeleteClass(false);
      } else {
        toast.error(
          response?.data?.error?.message ||
            response?.error?.data?.message ||
            response?.error?.message ||
            "Failed to delete live class"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete live class");
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsDeleteClass(true)}
        type="primary"
        danger
        size="small"
        className="w-full"
      >
        Delete
      </Button>

      <Modal
        open={isDeleteClass}
        onCancel={() => setIsDeleteClass(false)}
        onOk={handleDeleteLiveClass}
        title={`Delete ${liveClass?.title} ?`}
        okButtonProps={{
          danger: true,
          loading: isLoading,
          disabled: isLoading,
          iconPosition: "end",
        }}
        okText={isLoading ? "Deleting..." : "Delete"}
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
      >
        <p>Are you sure you want to delete {liveClass?.title}?</p>
      </Modal>
    </>
  );
};

export default DeleteLiveClass;
