import { useGetAllInstructorsQuery } from "@/features/instructor";
import { IInstructor } from "@/types/instructor.type";
import { Table } from "antd/lib";
import InstructorActions from "./InstructorActions";

const ManageInstructors = () => {
  const { data } = useGetAllInstructorsQuery({});
  const instructors = data?.data as IInstructor[];

  const columns = [
    {
      title: "Image",
      dataIndex: ["user", "image"],
      key: "image",
      render: (image: string, instructor: IInstructor) => (
        <div className="w-10 h-10 rounded-full overflow-hidden ring-1">
          <img
            src={image}
            alt={instructor?.user?.name}
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
      title: "Teacher ID",
      dataIndex: ["teacherId"],
      key: "teacherId",
      render: (teacherId: string) => (
        <span className="text-blue-500">{teacherId}</span>
      ),
    },
    {
      title: "Courses",
      key: "courses",
      render: (_: any, instructor: IInstructor) => (
        <ul className="list-disc pl-5">
          {instructor?.courses?.map((course) => (
            <li key={course?.id}>{course?.title}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, instructor: IInstructor) => (
        <InstructorActions instructor={instructor} />
      ),
    },
  ];

  return (
    <div className="lg:p-5 px-2 pb-20 overflow-x-auto">
      <h1 className="text-lg lg:text-2xl font-bold mb-4">Manage Instructors</h1>
      <Table
        columns={columns}
        dataSource={instructors}
        rowKey={(instructor) => instructor?.id}
        pagination={{ pageSize: 7 }}
        bordered
        className="shadow-md rounded-lg w-full min-w-[900px]"
      />
    </div>
  );
};

export default ManageInstructors;
