import { useGetAllUsersQuery } from "@/features/user";
import { IUser } from "@/types/user.type";
import { Button, Table } from "antd/lib";

const ManageUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery({});
  const users = data?.data as IUser[];

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string, user: IUser) => (
        <div className="w-10 h-10 rounded-full overflow-hidden ring-1">
          <img
            src={image}
            alt={user?.name}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span className="font-medium ">{name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <span className="text-blue-500">{email}</span>,
    },
    {
      title: "Role",
      dataIndex: ["role", "name"],
      key: "role",
      render: (role: string) => <span className="text-blue-500">{role}</span>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => (
        <span className="text-blue-500">{gender || "Empty"}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber: string) => (
        <span className="text-blue-500">{phoneNumber || "Empty"}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, user: IUser) => (
        <div>
          <Button type="primary">View Profile</Button>
        </div>
      ),
    },
  ];
  return (
    <div className="lg:p-5 px-2 pb-20 overflow-x-auto">
      <h1 className="text-lg lg:text-2xl font-bold mb-4">Manage Users</h1>
      <Table
        columns={columns}
        dataSource={users}
        rowKey={(user) => user?.id}
        pagination={{ pageSize: 10 }}
        bordered
        loading={isLoading}
        className="shadow-md rounded-lg w-full min-w-[900px]"
      />
    </div>
  );
};

export default ManageUsers;