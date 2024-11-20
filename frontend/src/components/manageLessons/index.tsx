import { useGetAllLessonsQuery } from "@/features/lesson";
import { IGetLesson } from "@/types/lesson.type";
import { Table, TableProps } from "antd/lib";
import LessonEditModal from "./LessonEditModal";

const ManageLessons = () => {
  const { data, isLoading } = useGetAllLessonsQuery({});
  const lessons = data?.data as IGetLesson[];
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
    <div className="mt-4">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">Manage Lessons</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={lessons}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ManageLessons;
