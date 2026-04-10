import { useAddNewRoleMutation } from "@/features/role";
import { Button, Form, Input, Modal, Tag } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const AddRoleModal = () => {
  const [newPermissions, setNewPermissions] = useState<string[]>([]);
  const [newPermission, setNewPermission] = useState("");
  const [roleName, setRoleName] = useState("");
  const [isCreateRole, setIsCreateRole] = useState(false);
  const [addNewRole, { isLoading }] = useAddNewRoleMutation();

  const handleAddPermission = () => {
    if (newPermission.trim() && !newPermissions.includes(newPermission)) {
      setNewPermissions([...newPermissions, newPermission.trim()]);
      setNewPermission("");
    }
  };

  const handleRemovePermission = (permission: string) => {
    setNewPermissions(newPermissions.filter((perm) => perm !== permission));
  };

  const handleAddNewRole = async () => {
    const newRole: { name: string; permissions: string[] } = {
      name: roleName,
      permissions: newPermissions,
    };
    try {
      const result: any = await addNewRole({ data: newRole });
      if (result?.data?.statusCode === 201) {
        toast.success(result?.data?.message || "Role added successfully!");
        setIsCreateRole(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to add role."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to add role. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button
        icon={<FaPlus />}
        size="small"
        onClick={() => setIsCreateRole(true)}
        type="primary"
      >
        Add Role
      </Button>
      <Modal
        open={isCreateRole}
        onCancel={() => setIsCreateRole(false)}
        title="Create new  role"
        onOk={handleAddNewRole}
        okText={isLoading ? "Creating..." : "Create"}
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
          <Form.Item label="Role name">
            <Input
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter role name"
              className="flex-grow"
              name="name"
            />
          </Form.Item>
          <Form.Item label="Add New Permission">
            <div className="flex items-center gap-2">
              <Input
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
                placeholder="Enter new permission"
                className="flex-grow"
                name="permission"
              />
              <Button type="primary" onClick={handleAddPermission}>
                Add
              </Button>
            </div>
          </Form.Item>

          <Form.Item label="Current Permissions">
            <div className="flex flex-wrap gap-2">
              {newPermissions.map((permission) => (
                <Tag
                  key={permission}
                  closable
                  onClose={() => handleRemovePermission(permission)}
                  className="bg-blue-100 text-blue-700"
                >
                  {permission}
                </Tag>
              ))}
              {newPermissions.length === 0 && (
                <p className="text-gray-500">No permissions added yet.</p>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddRoleModal;
