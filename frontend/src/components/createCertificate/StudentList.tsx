import { useGetAllStudentsQuery } from "@/features/student";
import { IStudent } from "@/types/student.type";
import { Button, Dropdown, Menu } from "antd/lib";

type Props = {
  setSelectedStudent: (values: { id: string; name: string }) => void;
};

const StudentList = ({ setSelectedStudent }: Props) => {
  const { data } = useGetAllStudentsQuery({});
  const students = data?.data as IStudent[];

  const menu = (
    <Menu>
      {students?.map((student) => (
        <Menu.Item
          onClick={() =>
            setSelectedStudent({
              id: student?.user?.id,
              name: student?.user?.name,
            })
          }
          key={student?.id}
        >
          <div className="p-2">
            <p className="font-semibold">{student?.user?.name}</p>
            <p className="text-gray-500 text-sm">
              Email: {student?.user?.email}
            </p>
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
