import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import { Table, TableProps } from "antd/lib";
import AssignmentReviewButton from "../manageReviewedAssignments/AssignmentReviewButton";
import AssignmentSubmissionModal from "../manageReviewedAssignments/AssignmentSubmissionModal";

type Props = {
  assignments: IAssignmentSubmission[];
  isLoading: boolean;
};

const PendingAssignmentTable = ({ assignments, isLoading }: Props) => {
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
        <div className="flex flex-col items-center gap-2">
          <AssignmentSubmissionModal
            submission={assignment?.submission}
            buttonSize="middle"
            buttonStyles="bg-yellow-600 text-white"
          />
          <AssignmentReviewButton
            assignment={assignment}
            buttonText="Review"
            buttonSize="middle"
            buttonType="primary"
          />
        </div>
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

export default PendingAssignmentTable;
