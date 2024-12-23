/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Table } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import CourseDropDownList from "./CourseDropDownList";
import EditableCell from "./EditableCell";
import getMergedColumns from "./getMergedColumns";
import ModulesSaveButton from "./ModulesSaveButton";
import NewModuleForm from "./NewModuleForm";

interface DataType {
  id: string;
  key: string;
  serial: number;
  name: string;
}

const CreateCourseOutline = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const courseTitle = query?.courseTitle as string;
  const [modules, setModules] = useState<DataType[]>([]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: DataType) => record.key === editingKey;

  const handleEditRow = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", serial: 0, ...record });
    setEditingKey(record.key);
  };

  const handleCancelEditRow = () => {
    setEditingKey("");
  };

  const handleSaveEditedRow = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;
      const newData = [...modules];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData.splice(index, 1, { ...newData[index], ...row });
        setModules(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setModules(newData);
        setEditingKey("");
      }
    } catch (errInfo: any) {
      toast.error(errInfo.errorFields[0]?.errors[0]);
    }
  };

  const removeModule = (row: DataType) => {
    const remaining = modules.filter((module) => module?.key !== row?.key);
    setModules(remaining);
  };

  const columns = [
    { title: "Serial", dataIndex: "serial", key: "serial", editable: true },
    { title: "Module Name", dataIndex: "name", key: "name", editable: true },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="primary"
              onClick={() => handleSaveEditedRow(record.key)}
              style={{ marginInlineEnd: 8 }}
            >
              Save
            </Button>
            <Button
              onClick={handleCancelEditRow}
              style={{ marginInlineEnd: 8 }}
            >
              Cancel
            </Button>
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              disabled={editingKey !== ""}
              onClick={() => handleEditRow(record)}
            >
              Edit
            </Button>
            <Button
              disabled={editingKey !== ""}
              onClick={() => removeModule(record)}
              danger
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const mergedColumns = getMergedColumns(columns, isEditing);

  return (
    <div className="mt-4 space-y-2">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold mb-2">Create Course Outline</h1>
        <CourseDropDownList />
        <div className="flex items-center gap-2 mt-2 text-lg font-semibold">
          <h4>Selected course: </h4>
          <h4>{courseTitle}</h4>
        </div>
        <NewModuleForm modules={modules} setModules={setModules} />
      </div>
      <div className="bg-white p-5 rounded-md shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-medium">Modules List</h2>
          <ModulesSaveButton modules={modules} />
        </div>
        <Form form={form} component={false}>
          <Table<DataType>
            components={{ body: { cell: EditableCell } }}
            bordered
            dataSource={modules}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{ onChange: handleCancelEditRow, pageSize: 5 }}
          />
        </Form>
      </div>
    </div>
  );
};

export default CreateCourseOutline;
