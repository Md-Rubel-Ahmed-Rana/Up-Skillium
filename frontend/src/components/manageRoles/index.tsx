import { useGetAllRolesQuery } from "@/features/role";
import { IRole } from "@/types/role.type";
import { Button, Table, TableProps } from "antd/lib";
import "tailwindcss/tailwind.css";
import RoleEditModal from "./RoleEditModal";

const ManageRoles = () => {
  const { data, isLoading } = useGetAllRolesQuery({});
  const roles = data?.data as IRole[];

  const columns: TableProps<IRole>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: string[]) => (
        <div className="flex flex-wrap gap-2">
          {permissions.map((perm) => (
            <span
              key={perm}
              className="bg-blue-100 text-blue-600 px-2 py-1 text-sm rounded-md"
            >
              {perm}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: Date) => new Date(updatedAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, role: IRole) => (
        <div className="flex items-center gap-2">
          <RoleEditModal role={role} />
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3">
      <h2 className="text-lg font-semibold mb-4">Manage Roles</h2>
      <Table
        dataSource={roles}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="custom-ant-table"
        loading={isLoading}
      />
    </div>
  );
};

export default ManageRoles;
