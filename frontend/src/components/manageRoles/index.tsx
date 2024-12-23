import { useGetAllRolesQuery } from "@/features/role";
import { IRole } from "@/types/role.type";
import { Table, TableProps } from "antd/lib";
import "tailwindcss/tailwind.css";
import AddRoleModal from "./AddRoleModal";
import RoleDeleteModal from "./RoleDeleteModal";
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
          <RoleDeleteModal role={role} />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold">Manage Roles</h2>
        <AddRoleModal />
      </div>
      <Table
        dataSource={roles}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="custom-ant-table"
        loading={isLoading}
        locale={{ emptyText: "No roles found" }}
      />
    </div>
  );
};

export default ManageRoles;
