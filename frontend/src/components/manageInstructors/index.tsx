import { useGetAllInstructorsQuery } from "@/features/instructor";
import { IInstructor } from "@/types/instructor.type";
import { Table } from "antd/lib";
import InstructorActions from "./InstructorActions";

const ManageInstructors = () => {
  const { data } = useGetAllInstructorsQuery({});
  const instructors = data?.data as IInstructor[];

  const columns = [
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
      render: (text: string) => <span className="text-blue-500">{text}</span>,
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
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ManageInstructors;
