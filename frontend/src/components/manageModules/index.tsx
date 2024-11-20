import { useGetAllModulesQuery } from "@/features/module";
import { IGetModule } from "@/types/module.type";
import { Table, TableProps } from "antd/lib";
import ModuleActions from "./ModuleActions";
import ViewLessonButton from "./ViewLessonButton";

const ManageModules = () => {
  const { data, isLoading } = useGetAllModulesQuery({});
  const modules = data?.data as IGetModule[];

  const columns: TableProps<IGetModule>["columns"] = [
    {
      title: "Module Name",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Serial",
      key: "serial",
      dataIndex: "serial",
    },
    {
      title: "Course",
      key: "course.image",
      dataIndex: ["course", "image", "title"],
      render: (_: string, module: IGetModule) => (
        <div className="flex items-center gap-2">
          <img
            src={module?.course?.image}
            alt="Course Thumbnail"
            className="h-12 w-12 rounded-full ring-1"
          />
          <h3>{module?.course?.title}</h3>
        </div>
      ),
    },
    {
      title: "Lessons",
      key: "lessons",
      dataIndex: "lessons",
      render: (lessons: string[], module: IGetModule) => (
        <ViewLessonButton
          lessons={lessons?.length || 0}
          moduleId={module?.id}
          moduleName={module?.title}
        />
      ),
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
      render: (_: any, record: IGetModule) => <ModuleActions />,
    },
  ];

  return (
    <div className="mt-4">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">Manage Modules</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={modules}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ManageModules;
