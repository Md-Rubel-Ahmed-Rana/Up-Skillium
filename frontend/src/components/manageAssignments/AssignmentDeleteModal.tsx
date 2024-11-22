import { useDeleteAssignmentMutation } from "@/features/assignment";
import { IGetLesson as IAssignment } from "@/types/lesson.type";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  assignment: IAssignment;
};

const AssignmentDeleteModal = ({ assignment }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteAssignment, { isLoading }] = useDeleteAssignmentMutation();

  const handleUpdateAssignment = async () => {
    try {
      const result: any = await deleteAssignment({ id: assignment?.id });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Assignment deleted successfully!"
        );
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to delete assignment."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to delete assignment. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button danger type="primary" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Assignment Delete"
        okText="Delete"
        onOk={handleUpdateAssignment}
        okButtonProps={{
          disabled: isLoading,
          loading: isLoading,
          iconPosition: "end",
        }}
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
      >
        <p className="text-gray-600 text-md my-5 font-semibold">
          Are you sure you want to delete the assignment : {assignment?.title}?
        </p>
      </Modal>
    </>
  );
};

export default AssignmentDeleteModal;
