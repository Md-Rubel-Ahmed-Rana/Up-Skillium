import { IGetLesson } from "@/types/lesson.type";
import { Table, TableProps } from "antd/lib";
import LessonEditModal from "./LessonEditModal";

type Props = {
  lessons: IGetLesson[];
  isLoading: boolean;
};

const LessonTable = ({ lessons, isLoading }: Props) => {
  const columns: TableProps<IGetLesson>["columns"] = [
    {
      title: "Lesson Name",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Serial",
      key: "serial",
      dataIndex: "serial",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
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
      render: (_: any, lesson: IGetLesson) => (
        <LessonEditModal lesson={lesson} />
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={lessons}
      loading={isLoading}
      bordered
      pagination={{ pageSize: 10 }}
      className="shadow-md rounded-lg w-full min-w-[900px]"
    />
  );
};

export default LessonTable;
