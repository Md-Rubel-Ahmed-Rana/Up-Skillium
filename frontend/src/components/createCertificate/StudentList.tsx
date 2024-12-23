import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetMyStudentsQuery } from "@/features/instructor";
import { useGetAllStudentsQuery } from "@/features/student";
import { IMyStudent, IStudent } from "@/types/student.type";
import { IUser } from "@/types/user.type";
import { Button, Dropdown, Menu } from "antd/lib";

type Props = {
  setSelectedStudent: (values: { id: string; name: string }) => void;
};

const StudentList = ({ setSelectedStudent }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data: studentsData } = useGetMyStudentsQuery({
    instructorId: user?.id,
  });
  const instructorStudents = studentsData?.data as IMyStudent[];
  const instructorStudentsUsers =
    instructorStudents?.map((student) => student?.student) || ([] as IUser[]);
  const { data } = useGetAllStudentsQuery({});
  const adminStudents = data?.data as IStudent[];
  const adminStudentsUsers = adminStudents?.map(
    (student) => student?.user
  ) as IUser[];

  const students =
    user?.role?.name === "admin" ? adminStudentsUsers : instructorStudentsUsers;

  const menu = (
    <Menu className="w-full max-h-72 h-full overflow-y-auto">
      {students?.length <= 0 ? (
        <div className="p-2">
          <p>No students found</p>
        </div>
      ) : (
        students?.map((student) => (
          <Menu.Item
            onClick={() =>
              setSelectedStudent({
                id: student?.id,
                name: student?.name,
              })
            }
            key={student?.id}
          >
            <div className="p-1  border rounded-sm hover:bg-white hover:border-primary">
              <p className="font-semibold">{student?.name}</p>
              <p className="text-gray-500 text-sm">Email: {student?.email}</p>
            </div>
          </Menu.Item>
        ))
      )}
    </Menu>
  );

  return (
    <Dropdown className="w-full" overlay={menu} trigger={["click"]}>
      <Button className="font-semibold">Select Student</Button>
    </Dropdown>
  );
};

export default StudentList;
