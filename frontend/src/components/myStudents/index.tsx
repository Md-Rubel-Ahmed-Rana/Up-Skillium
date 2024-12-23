import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetMyStudentsQuery } from "@/features/instructor";
import { IMyStudent } from "@/types/student.type";
import { IUser } from "@/types/user.type";
import { Avatar, Table } from "antd/lib";
import StudentActions from "./StudentActions";

const MyStudents = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const { data: studentsData, isLoading } = useGetMyStudentsQuery({
    instructorId: user?.id,
  });
  const students = studentsData?.data as IMyStudent[];
  const columns = [
    {
      title: "Image",
      dataIndex: ["student", "image"],
      key: "image",
      render: (image: string, student: IMyStudent) => (
        <div className="w-10 h-10 rounded-full overflow-hidden ring-1">
          {image ? (
            <img
              src={image}
              alt={student?.student?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Avatar className="w-full h-full object-cover">
              {student?.student?.name.slice(0, 1).toUpperCase()}
            </Avatar>
          )}
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: ["student", "name"],
      key: "name",
      render: (name: string) => <span className="font-medium ">{name}</span>,
    },
    {
      title: "Email",
      dataIndex: ["student", "email"],
      key: "email",
      render: (email: string) => <span className="text-blue-500">{email}</span>,
    },

    {
      title: "Courses",
      key: "courses",
      render: (_: any, student: IMyStudent) => (
        <ul className="list-disc pl-5 flex flex-col gap-2">
          {student?.courses?.map((course) => (
            <li className="flex items-center gap-2" key={course?.id}>
              <img
                src={course?.image}
                alt={course?.title}
                className="w-8 h-8 rounded-full right-1 object-cover"
              />
              <h3>{course?.title}</h3>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, student: IMyStudent) => (
        <StudentActions student={student} />
      ),
    },
  ];
  return (
    <div className="mt-3">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">My Students</h2>
      <Table
        columns={columns}
        dataSource={students}
        rowKey={(student) => student?.student?.id}
        pagination={{ pageSize: 5 }}
        bordered
        loading={isLoading}
        className="shadow-md rounded-lg w-full min-w-[900px]"
        locale={{ emptyText: "No students found" }}
      />
    </div>
  );
};

export default MyStudents;
