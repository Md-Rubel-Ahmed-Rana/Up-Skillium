import { useGetAllAssignmentsQuery } from "@/features/assignment";
import { IGetLesson as IAssignment } from "@/types/lesson.type";
import { Button, Table, TableProps } from "antd/lib";
import Link from "next/link";
import AssignmentDeleteModal from "./AssignmentDeleteModal";

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
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/update-assignment/${assignment?.id}?title=${assignment?.title}&module=${assignment?.module?.title}&content=${assignment?.content}`}
          >
            <Button type="primary">Edit</Button>
          </Link>
          <AssignmentDeleteModal assignment={assignment} />
        </div>
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
