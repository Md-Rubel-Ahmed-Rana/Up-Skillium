import { IGetLesson as IAssignment } from "@/types/lesson.type";
import { Table, TableProps } from "antd/lib";
import DeleteLesson from "../lessons/DeleteLesson";
import EditLesson from "../lessons/EditLesson";

type Props = {
  assignments: IAssignment[];
  isLoading: boolean;
};

const AssignmentLessonTable = ({ assignments, isLoading }: Props) => {
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
        <div className="flex flex-col gap-2">
          <EditLesson
            lesson={assignment}
            isButton={true}
            buttonSize="small"
            buttonStyles="w-full"
          />
          <DeleteLesson
            lessonId={assignment?.id}
            lessonTitle={assignment?.title}
            shouldAddIcon={false}
            buttonSize="small"
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
      locale={{ emptyText: "No assignment lessons found" }}
    />
  );
};

export default AssignmentLessonTable;
