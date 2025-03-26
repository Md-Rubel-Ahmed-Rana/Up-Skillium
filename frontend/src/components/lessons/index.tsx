import useTableSearch from "@/hooks/useTableSearch";
import { IGetLesson } from "@/types/lesson.type";
import { Table, TableProps } from "antd/lib";
import DeleteLesson from "./DeleteLesson";
import EditLesson from "./EditLesson";

type Props = {
  lessons: IGetLesson[];
  isLoading: boolean;
};

const LessonTable = ({ lessons, isLoading }: Props) => {
  const { getColumnSearchProps } = useTableSearch();

  const columns: TableProps<IGetLesson>["columns"] = [
    {
      title: "Lesson Name",
      key: "title",
      dataIndex: "title",
      ...getColumnSearchProps("title"),
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
        <div className="flex flex-col gap-2">
          <EditLesson
            lesson={lesson}
            isButton={true}
            buttonSize="small"
            buttonStyles="w-full"
          />
          <DeleteLesson
            lessonId={lesson?.id}
            lessonTitle={lesson?.title}
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
      dataSource={lessons}
      loading={isLoading}
      bordered
      pagination={{ pageSize: 10 }}
      className="shadow-md rounded-lg w-full min-w-[900px]"
      locale={{ emptyText: "No lessons found" }}
    />
  );
};

export default LessonTable;
