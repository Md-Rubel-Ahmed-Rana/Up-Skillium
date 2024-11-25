import { useGetAllPendingAssignmentsQuery } from "@/features/assignmentSubmission";
import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import { Button, Table, TableProps } from "antd/lib";
import Link from "next/link";

const ManagePendingAssignments = () => {
  const { data, isLoading } = useGetAllPendingAssignmentsQuery({});
  const assignments = data?.data as IAssignmentSubmission[];

  const columns: TableProps<IAssignmentSubmission>["columns"] = [
    {
      title: "Serial",
      key: "serial",
      render: (value: any, record: any, index: number) => <h3>{index + 1}</h3>,
    },
    {
      title: "Student",
      dataIndex: ["user", "name"],
      key: "name",
      render: (name: string, assignment: IAssignmentSubmission) => (
        <div className="flex items-center gap-2">
          <img
            className="h-10 w-10 rounded-full ring-1"
            src={assignment?.user?.image}
            alt={name}
          />
          <h5>{name}</h5>
        </div>
      ),
    },
    {
      title: "Lesson",
      key: "lesson.title",
      dataIndex: ["lesson", "title"],
    },
    {
      title: "Submitted At",
      key: "submittedAt",
      dataIndex: "submittedAt",
      render: (submittedAt: Date) => (
        <h3>{new Date(submittedAt).toLocaleString()}</h3>
      ),
    },
    {
      title: "Is Late",
      key: "isLate",
      dataIndex: "isLate",
      render: (isLate: boolean) => <h3>{isLate ? "Yes" : "No"}</h3>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: string) => <h3>{status}</h3>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, assignment: IAssignmentSubmission) => (
        <div className="flex items-center gap-2">
          <Button type="default">Submission</Button>
          <Link
            href={`/dashboard/update-assignment/${assignment?.id}?lessonTitle=${assignment?.lesson?.title}`}
          >
            <Button type="primary">Review</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Pending Assignments
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

export default ManagePendingAssignments;
