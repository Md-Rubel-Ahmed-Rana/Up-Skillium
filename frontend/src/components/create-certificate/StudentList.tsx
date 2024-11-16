import { useGetAllRolesQuery } from "@/features/role";
import { useGetAllUsersQuery } from "@/features/user";
import { IRole } from "@/types/user.type";
import { Button, Dropdown, Menu } from "antd/lib";

const StudentList = () => {
  const { data } = useGetAllUsersQuery({});
  const { data: roleData } = useGetAllRolesQuery({});
  const users = data?.data?.users as any[];
  const roles = roleData?.data as IRole[];
  const studentRole = roles?.find((role) => role?.role === "student");
  const students = users?.filter(
    (user) => (user?.role as string) === studentRole?.id
  );

  const menu = (
    <Menu>
      {students?.map((student) => (
        <Menu.Item key={student?.id}>
          <div className="p-2">
            <p className="font-semibold">{student?.name}</p>
            <p className="text-gray-500 text-sm">Email: {student?.email}</p>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button className="font-semibold">Select Student</Button>
      </Dropdown>
    </div>
  );
};

export default StudentList;
