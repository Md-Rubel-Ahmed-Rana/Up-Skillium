import { useGetAllAssignmentsQuery } from "@/features/assignment";
import { IGetLesson as IAssignment } from "@/types/lesson.type";
import { Table, TableProps } from "antd/lib";
import UpdateAssignmentModal from "./UpdateAssignmentModal";

const ManageAssignments = () => {
  const { data, isLoading } = useGetAllAssignmentsQuery({});
  const assignments = data?.data as IAssignment[];
  const columns: TableProps<IAssignment>["columns"] = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Serial",
      key: "serial",
      dataIndex: "serial",
    },
    {
      title: "Module",
      key: "module.title",
      dataIndex: ["module", "title"],
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, assignment: IAssignment) => (
        <UpdateAssignmentModal assignment={assignment} />
      ),
    },
  ];
  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Manage Assignments
      </h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={assignments}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
        className="shadow-md rounded-lg w-full min-w-[900px]"
      />
    </div>
  );
};

export default ManageAssignments;
