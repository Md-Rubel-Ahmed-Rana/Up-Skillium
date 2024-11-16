import { useGetAllRolesQuery } from "@/features/role";
import { useGetAllUsersQuery } from "@/features/user";
import { IRole } from "@/types/user.type";
import { Button, Dropdown, Menu } from "antd/lib";

type Props = {
  setSelectedStudent: (values: { id: string; name: string }) => void;
};

const StudentList = ({ setSelectedStudent }: Props) => {
  const { data } = useGetAllUsersQuery({});
  const { data: roleData } = useGetAllRolesQuery({});
  const users = data?.data?.users as any[];
  const roles = roleData?.data as IRole[];
  const studentRole = roles?.find((role) => role?.role === "student");
  const students = users?.filter(
    (user) => (user?.role as string) === studentRole?.id
  );

  console.log(students);

  const menu = (
    <Menu>
      {students?.map((student) => (
        <Menu.Item
          onClick={() =>
            setSelectedStudent({
              id: student?.id || student?._id,
              name: student?.name,
            })
          }
          key={student?.id}
        >
          <div className="p-2">
            <p className="font-semibold">{student?.name}</p>
            <p className="text-gray-500 text-sm">Email: {student?.email}</p>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown className="w-full" overlay={menu} trigger={["click"]}>
      <Button className="font-semibold">Select Student</Button>
    </Dropdown>
  );
};

export default StudentList;
