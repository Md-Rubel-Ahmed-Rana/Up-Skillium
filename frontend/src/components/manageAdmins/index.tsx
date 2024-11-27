import { useGetAllAdminsQuery } from "@/features/admin";
import { IAdmin } from "@/types/admin.type";
import { Table } from "antd/lib";
import UserActiveInactiveButton from "../manageUsers/UserActiveInactiveButton";
import PublicProfileRedirectLink from "../publicProfile/PublicProfileRedirectLink";

const ManageAdmins = () => {
  const { data, isLoading } = useGetAllAdminsQuery({});
  const admins = data?.data as IAdmin[];
  const columns = [
    {
      title: "Image",
      dataIndex: ["user", "image"],
      key: "image",
      render: (image: string, admin: IAdmin) => (
        <div className="w-10 h-10 rounded-full overflow-hidden ring-1">
          <img
            src={image}
            alt={admin?.user?.name}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: ["user", "name"],
      key: "name",
      render: (text: string) => <span className="font-medium ">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
      render: (email: string) => <span className="text-blue-500">{email}</span>,
    },
    {
      title: "Admin ID",
      dataIndex: ["adminId"],
      key: "adminId",
      render: (adminId: string) => (
        <span className="text-blue-500">{adminId}</span>
      ),
    },
    {
      title: "Created At",
      dataIndex: ["createdAt"],
      key: "createdAt",
      render: (date: Date) => (
        <span className="text-blue-500">
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, admin: IAdmin) => (
        <div className="flex items-center gap-2">
          <PublicProfileRedirectLink
            buttonType="primary"
            isButton={true}
            linkText="Profile"
            user={admin?.user}
          />
          <UserActiveInactiveButton
            buttonType="default"
            user={{
              id: admin?.user?.id || admin?.user?._id,
              status: admin?.user?.status as "active" | "inactive",
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="lg:p-5 px-2 pb-20 overflow-x-auto">
      <h1 className="text-lg lg:text-2xl font-bold mb-4">Manage Admins</h1>
      <Table
        columns={columns}
        dataSource={admins}
        rowKey={(admin) => admin?.id}
        pagination={{ pageSize: 10 }}
        bordered
        className="shadow-md rounded-lg w-full min-w-[900px]"
        loading={isLoading}
      />
    </div>
  );
};

export default ManageAdmins;
