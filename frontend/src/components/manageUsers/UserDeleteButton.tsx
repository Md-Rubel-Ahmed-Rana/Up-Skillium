import { useDeleteUserAccountMutation } from "@/features/user";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type User = {
  id: string;
  userName: string;
};

type Props = {
  user: User;
  buttonStyles?: string;
  buttonType: "dashed" | "default" | "primary";
};

const UserDeleteButton = ({
  user: { id, userName },
  buttonType = "default",
  buttonStyles,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAccount, { isLoading }] = useDeleteUserAccountMutation();

  const handleUpdateAccountStatus = async () => {
    try {
      const result: any = await deleteAccount({
        userId: id,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || `Account has been  deleted successfully!`
        );
        setIsModalOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to delete account."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to delete account. Error: ${error?.message}`);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        className={buttonStyles}
        type={buttonType}
        danger
        onClick={openModal}
      >
        Delete
      </Button>

      <Modal
        title={`Confirm Deletion`}
        open={isModalOpen}
        onOk={handleUpdateAccountStatus}
        onCancel={closeModal}
        maskClosable={!isLoading}
        okText={isLoading ? "Deleting.." : "Delete"}
        okButtonProps={{
          danger: true,
          loading: isLoading,
          disabled: isLoading,
          iconPosition: "end",
        }}
        cancelButtonProps={{ disabled: isLoading }}
      >
        <p>
          <span className="mr-2">
            Are you sure you want to delete the account of
          </span>
          <strong>{userName}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default UserDeleteButton;
