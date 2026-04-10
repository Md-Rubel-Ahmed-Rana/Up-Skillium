import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import { Table, TableProps } from "antd/lib";
import AssignmentActions from "../manageReviewedAssignments/AssignmentActions";

type Props = {
  assignments: IAssignmentSubmission[];
  isLoading: boolean;
};

const ReviewedAssignmentTable = ({ assignments, isLoading }: Props) => {
  const columns: TableProps<IAssignmentSubmission>["columns"] = [
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
      title: "Full Marks",
      key: "fullMark",
      dataIndex: "fullMark",
      render: (fullMark: number) => <h3>{fullMark}</h3>,
    },
    {
      title: "Got Marks",
      key: "yourMark",
      dataIndex: "yourMark",
      render: (yourMark: number) => <h3>{yourMark}</h3>,
    },
    {
      title: "Checked At",
      key: "checkedAt",
      dataIndex: "checkedAt",
      render: (checkedAt: Date) => (
        <h3>{new Date(checkedAt).toLocaleString()}</h3>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, assignment: IAssignmentSubmission) => (
        <AssignmentActions assignment={assignment} />
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={assignments}
      loading={isLoading}
      bordered
      pagination={{ pageSize: 10 }}
      className="shadow-md rounded-lg w-full min-w-[900px]"
      locale={{ emptyText: "No assignments found" }}
    />
  );
};

export default ReviewedAssignmentTable;
