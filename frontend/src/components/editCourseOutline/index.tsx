import { useGetSingleCourseOutlineQuery } from "@/features/courseOutline";
import { ICourseOutline, IModuleOutline } from "@/types/courseOutline.type";
import { Button, Input, Table } from "antd/lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddNewModuleButton from "./AddNewModuleButton";
import ModulesUpdateButton from "./ModulesUpdateButton";

const CourseOutlineEdit = () => {
  const { query } = useRouter();
  const outlineId = query?.outlineId as string;
  const { data, isLoading } = useGetSingleCourseOutlineQuery({ id: outlineId });
  const outline = data?.data as ICourseOutline;
  const [modules, setModules] = useState<IModuleOutline[]>([]);

  const handleSave = (id: string, updatedModule: Partial<IModuleOutline>) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, ...updatedModule } : module
      )
    );
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (text: number, record: IModuleOutline) => (
        <Input
          type="number"
          defaultValue={text}
          className="w-20"
          onBlur={(e) =>
            handleSave(record.id, { serial: parseInt(e.target.value, 10) })
          }
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: IModuleOutline) => (
        <Input
          defaultValue={text}
          placeholder="Module name"
          onBlur={(e) => handleSave(record.id, { name: e.target.value })}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IModuleOutline) => (
        <Button
          type="primary"
          danger
          onClick={() => handleRemoveModule(record?.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleRemoveModule = (id: string) => {
    const remaining = modules.filter((module) => module?.id !== id);
    setModules(remaining);
  };

  useEffect(() => {
    if (outline) {
      setModules(
        outline?.modules.map((module) => ({ ...module, status: "old" })) || []
      );
    }
  }, [outline]);

  return (
    <div className="p-4">
      <div className="mb-3">
        <h1 className="text-2xl font-bold">Edit Course Outline</h1>
        <h2 className="text-xl font-semibold">
          Course: {isLoading ? "Loading..." : outline?.course?.title}
        </h2>
      </div>

      <Table
        dataSource={modules}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="mb-6"
        loading={isLoading}
      />

      <div className="my-4 flex justify-start items-center gap-5">
        <AddNewModuleButton modules={modules} setModules={setModules} />
        <ModulesUpdateButton modules={modules} />
      </div>
    </div>
  );
};

export default CourseOutlineEdit;
