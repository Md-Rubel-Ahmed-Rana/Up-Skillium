import { useActiveInactiveUserAccountMutation } from "@/features/user";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type User = {
  id: string;
  status: "active" | "inactive";
  userName: string;
};

type Props = {
  user: User;
  buttonStyles?: string;
  buttonType: "dashed" | "default" | "primary";
};

const UserActiveInactiveButton = ({
  user: { id, status, userName },
  buttonType = "default",
  buttonStyles,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatus, { isLoading }] = useActiveInactiveUserAccountMutation();

  const handleUpdateAccountStatus = async () => {
    try {
      const result: any = await updateStatus({
        userId: id,
        status: status === "active" ? "inactive" : "active",
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message ||
            `Account has been ${
              status === "active" ? "inactivated" : "activated"
            } successfully!`
        );
        setIsModalOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update account status."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update account status. Error: ${error?.message}`);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        className={buttonStyles}
        type={buttonType}
        onClick={openModal}
        loading={isLoading}
      >
        {status === "active" ? "Inactive" : "Active"}
      </Button>

      <Modal
        title={`Confirm ${status === "active" ? "Inactivation" : "Activation"}`}
        open={isModalOpen}
        onOk={handleUpdateAccountStatus}
        onCancel={closeModal}
        okText={status === "active" ? "Inactivate" : "Activate"}
        okButtonProps={{
          danger: status === "active",
          loading: isLoading,
          disabled: isLoading,
        }}
        cancelButtonProps={{ disabled: isLoading }}
      >
        <p>
          Are you sure you want to{" "}
          <strong>{status === "active" ? "inactivate" : "activate"}</strong> the
          account of <strong>{userName}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default UserActiveInactiveButton;
