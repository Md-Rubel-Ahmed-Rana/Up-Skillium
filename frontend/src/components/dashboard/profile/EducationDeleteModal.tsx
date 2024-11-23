import { useDeleteEducationMutation } from "@/features/education";
import { IEducation } from "@/types/education.type";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  education: IEducation;
};

const EducationDeleteModal = ({ education }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteEducation, { isLoading }] = useDeleteEducationMutation();

  const handleDeleteEducation = async () => {
    try {
      const result: any = await deleteEducation({ id: education?.id });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Education deleted successfully!"
        );
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to delete education."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to delete education. Error: ${error?.message}`);
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
        title="Delete Education"
        okText="Delete"
        onOk={handleDeleteEducation}
        okButtonProps={{
          disabled: isLoading,
          loading: isLoading,
          iconPosition: "end",
        }}
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
      >
        <p className="text-gray-600 text-md my-5 font-semibold">
          Are you sure you want to delete the education : {education?.institute}
          ?
        </p>
      </Modal>
    </>
  );
};

export default EducationDeleteModal;
