import { IGetModule } from "@/types/module.type";
import { Table, TableProps } from "antd/lib";
import DeleteModuleModal from "../manageModules/DeleteModuleModal";
import EditModuleModal from "../manageModules/EditModuleModal";
import ViewLessonButton from "./ViewLessonButton";

type Props = {
  modules: IGetModule[];
  isLoading: boolean;
};

const ModulesTable = ({ modules, isLoading }: Props) => {
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
      title: "Actions",
      key: "actions",
      render: (_: any, module: IGetModule) => (
        <div className="flex flex-col items-center gap-1">
          <EditModuleModal
            module={module}
            isButton={true}
            buttonStyles="w-full"
            buttonSize="small"
          />
          <DeleteModuleModal
            moduleId={module?.id}
            moduleTitle={module?.title}
            isButton={true}
            buttonStyles="w-full"
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
      dataSource={modules}
      loading={isLoading}
      bordered
      pagination={{ pageSize: 10 }}
      className="shadow-md rounded-lg w-full min-w-[900px]"
      locale={{ emptyText: "No modules found" }}
    />
  );
};

export default ModulesTable;
