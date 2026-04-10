import { useDeleteRoleMutation } from "@/features/role";
import { IRole } from "@/types/role.type";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  role: IRole;
};

const RoleDeleteModal = ({ role }: Props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [deleteRole, { isLoading }] = useDeleteRoleMutation();

  const handleUpdateRole = async () => {
    try {
      const result: any = await deleteRole({ id: role?.id });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Role deleted successfully!");
        setIsDelete(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to delete role."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to delete role. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button onClick={() => setIsDelete(true)} type="primary" danger>
        Delete
      </Button>
      <Modal
        open={isDelete}
        onCancel={() => setIsDelete(false)}
        title="Delete role"
        onOk={handleUpdateRole}
        okText={isLoading ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
        okButtonProps={{
          disabled: isLoading,
          loading: isLoading,
          iconPosition: "end",
        }}
      >
        <p>Are you sure you want to delete the role : {role?.name}</p>
      </Modal>
    </>
  );
};

export default RoleDeleteModal;
