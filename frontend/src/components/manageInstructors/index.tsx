import { useGetAllInstructorsQuery } from "@/features/instructor";
import { IInstructor } from "@/types/instructor.type";
import { Avatar, Table } from "antd/lib";
import InstructorActions from "./InstructorActions";

const ManageInstructors = () => {
  const { data, isLoading } = useGetAllInstructorsQuery({});
  const instructors = data?.data as IInstructor[];

  const columns = [
    {
      title: "Image",
      dataIndex: ["user", "image"],
      key: "image",
      render: (image: string, instructor: IInstructor) => (
        <>
          {image ? (
            <img
              src={image}
              alt={instructor?.user?.name}
              className="w-10 h-10 rounded-full overflow-hidden ring-1 object-cover"
            />
          ) : (
            <Avatar className="h-10 w-10 rounded-full bg-blue-600 ring-1">
              {instructor?.user?.name?.slice(0, 1)?.toUpperCase()}
            </Avatar>
          )}
        </>
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
        pagination={{ pageSize: 5 }}
        bordered
        loading={isLoading}
        className="shadow-md rounded-lg w-full min-w-[900px]"
        locale={{ emptyText: "No instructors found" }}
      />
    </div>
  );
};

export default ManageInstructors;
