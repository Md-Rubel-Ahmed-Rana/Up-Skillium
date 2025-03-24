import { useGetAllUsersQuery } from "@/features/user";
import { IUser } from "@/types/user.type";
import { Avatar, Table } from "antd/lib";
import UserActions from "./UserActions";

const ManageUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery({});
  const users = data?.data as IUser[];

  const columns: any = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string, user: IUser) => (
        <div className="w-10 h-10 rounded-full overflow-hidden ring-1">
          {image ? (
            <img
              src={image}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Avatar className="w-full h-full object-cover">
              {user?.name?.slice(0, 1).toUpperCase()}
            </Avatar>
          )}
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
      filters: [
        { text: "Admin", value: "admin" },
        { text: "Instructor", value: "instructor" },
        { text: "Student", value: "student" },
      ],
      onFilter: (value: string, user: IUser) => user.role.name === value,
      render: (role: string) => <span className="text-blue-500">{role}</span>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
      ],
      onFilter: (value: string, user: IUser) => user?.gender === value,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value: string, user: IUser) => user.status === value,
      render: (status: string) => (
        <span
          className={`${
            status === "active" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, user: IUser) => <UserActions user={user} />,
    },
  ];

  return (
    <div className="lg:p-5 px-2 pb-20 overflow-x-auto">
      <h1 className="text-lg lg:text-2xl font-bold mb-4">Manage Users</h1>
      <Table
        columns={columns}
        dataSource={users}
        rowKey={(user) => user?.id || user?._id}
        pagination={{ pageSize: 10 }}
        bordered
        loading={isLoading}
        className="shadow-md rounded-lg w-full min-w-[900px]"
        locale={{ emptyText: "No users found" }}
      />
    </div>
  );
};

export default ManageUsers;
