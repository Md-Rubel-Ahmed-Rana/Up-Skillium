import { useUpdateRoleMutation } from "@/features/role";
import { IRole } from "@/types/role.type";
import { Button, Form, Input, Modal, Tag } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  role: IRole;
};

const RoleEditModal = ({ role }: Props) => {
  const [editedPermissions, setEditedPermissions] = useState<string[]>(
    role?.permissions || []
  );
  const [newPermission, setNewPermission] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [updateRole, { isLoading }] = useUpdateRoleMutation();

  const handleAddPermission = () => {
    if (newPermission.trim() && !editedPermissions.includes(newPermission)) {
      setEditedPermissions([...editedPermissions, newPermission.trim()]);
      setNewPermission("");
    }
  };

  const handleRemovePermission = (permission: string) => {
    setEditedPermissions(
      editedPermissions.filter((perm) => perm !== permission)
    );
  };

  const handleUpdateRole = async () => {
    const updatedRole: IRole = { ...role, permissions: editedPermissions };
    try {
      const result: any = await updateRole({ id: role?.id, data: updatedRole });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Role updated successfully!");
        setIsEdit(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update role."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update role. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button onClick={() => setIsEdit(true)} type="primary">
        Edit
      </Button>
      <Modal
        open={isEdit}
        onCancel={() => setIsEdit(false)}
        title="Edit Permissions"
        onOk={handleUpdateRole}
        okText={isLoading ? "Saving..." : "Save changes"}
        cancelText="Cancel"
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
        okButtonProps={{
          disabled: isLoading,
          loading: isLoading,
          iconPosition: "end",
        }}
      >
        <Form layout="vertical" className="space-y-4">
          <Form.Item label="Add New Permission">
            <div className="flex items-center gap-2">
              <Input
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
                placeholder="Enter new permission"
                className="flex-grow"
              />
              <Button type="primary" onClick={handleAddPermission}>
                Add
              </Button>
            </div>
          </Form.Item>

          <Form.Item label="Current Permissions">
            <div className="flex flex-wrap gap-2">
              {editedPermissions.map((permission) => (
                <Tag
                  key={permission}
                  closable
                  onClose={() => handleRemovePermission(permission)}
                  className="bg-blue-100 text-blue-700"
                >
                  {permission}
                </Tag>
              ))}
              {editedPermissions.length === 0 && (
                <p className="text-gray-500">No permissions added yet.</p>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RoleEditModal;
