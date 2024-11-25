import { useGetAllStudentsQuery } from "@/features/student";
import { IStudent } from "@/types/student.type";
import { Table } from "antd/lib";
import StudentActions from "./InstructorActions";

const ManageStudents = () => {
  const { data, isLoading } = useGetAllStudentsQuery({});
  const students = data?.data as IStudent[];
  const columns = [
    {
      title: "Image",
      dataIndex: ["user", "image"],
      key: "image",
      render: (image: string, student: IStudent) => (
        <div className="w-10 h-10 rounded-full overflow-hidden ring-1">
          <img
            src={image}
            alt={student?.user?.name}
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
      title: "Student ID",
      dataIndex: ["studentId"],
      key: "studentId",
      render: (studentId: string) => (
        <span className="text-blue-500">{studentId}</span>
      ),
    },
    {
      title: "Courses",
      key: "courses",
      render: (_: any, student: IStudent) => (
        <ul className="list-disc pl-5">
          {student?.courses?.map((course) => (
            <li key={course?.id}>{course?.title}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Enrolled At",
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
      render: (_: any, student: IStudent) => (
        <StudentActions student={student} />
      ),
    },
  ];

  return (
    <div className="lg:p-5 px-2 pb-20 overflow-x-auto">
      <h1 className="text-lg lg:text-2xl font-bold mb-4">Manage Students</h1>
      <Table
        columns={columns}
        dataSource={students}
        rowKey={(student) => student?.id}
        pagination={{ pageSize: 10 }}
        bordered
        className="shadow-md rounded-lg w-full min-w-[900px]"
        loading={isLoading}
      />
    </div>
  );
};

export default ManageStudents;
