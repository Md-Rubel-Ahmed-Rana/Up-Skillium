import {
  ICreateModuleOutline,
  ICreateOutline,
} from "@/types/courseOutline.type";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import CourseDropDownList from "./CourseDropDownList";

const CreateCourseOutline = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const courseTitle = query?.courseTitle as string;
  const [createModules, setCreateModules] = useState<ICreateModuleOutline[]>(
    []
  );

  const handleCreateModules = () => {
    const outline: ICreateOutline = {
      course: courseId,
      modules: createModules,
    };
    console.log(outline);
  };

  const handleAddModule = (values: ICreateModuleOutline) => {
    setCreateModules([
      ...createModules,
      { ...values, serial: Number(values?.serial) },
    ]);
    form.resetFields();
  };

  const handleDeleteModule = (serial: number) => {
    setCreateModules(
      createModules.filter((module) => module.serial !== serial)
    );
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Module Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ICreateModuleOutline) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeleteModule(record.serial)}
        />
      ),
    },
  ];

  return (
    <div className="mt-4 space-y-2">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold mb-2">Create Course Outline</h1>
        <CourseDropDownList />
        <div className="flex items-center gap-2 mt-2 text-lg font-semibold">
          <h4>Selected course: </h4>
          <h4>{courseTitle}</h4>
        </div>
      </div>
      <Form
        form={form}
        layout="inline"
        onFinish={handleAddModule}
        className=" bg-white flex items-center rounded-md p-5 shadow-md"
      >
        <Form.Item
          name="serial"
          rules={[{ required: true, message: "Serial is required" }]}
        >
          <Input type="number" placeholder="Serial" prefix={<span>#</span>} />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[{ required: true, message: "Module name is required" }]}
        >
          <Input placeholder="Module Name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add Module
          </Button>
        </Form.Item>
      </Form>

      <div className="bg-white p-5 rounded-md shadow-md">
        <div className="flex items-center gap-2  mb-4">
          <h2 className="text-xl font-medium">Modules List</h2>
          <Button
            onClick={handleCreateModules}
            disabled={createModules?.length <= 0}
            type="primary"
            htmlType="button"
          >
            Save Modules
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={createModules}
          rowKey="serial"
          pagination={false}
          className="shadow-md rounded-lg"
        />
      </div>
    </div>
  );
};

export default CreateCourseOutline;
