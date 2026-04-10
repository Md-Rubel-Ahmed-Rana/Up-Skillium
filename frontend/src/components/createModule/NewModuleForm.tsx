import { PlusOutlined } from "@ant-design/icons/lib";
import { Button, Form, Input } from "antd/lib";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import JSONUploaderModel from "./JSONUploaderModel";

interface DataType {
  id: string;
  key: string;
  serial: number;
  title: string;
}

type Props = {
  modules: DataType[];
  setModules: (modules: DataType[]) => void;
};

const NewModuleForm = ({ modules, setModules }: Props) => {
  const [form] = Form.useForm();
  const [isUploadJson, setIsUploadJson] = useState(false);

  const handleAddModule = (values: DataType) => {
    const newModule = {
      ...values,
      serial: Number(values.serial),
      id: "",
      key: uuidv4(),
    };
    setModules([...modules, newModule]);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleAddModule}
      className=" bg-white flex rounded-md p-5 shadow-md"
    >
      <Form.Item
        name="serial"
        rules={[{ required: true, message: "Serial is required" }]}
      >
        <Input type="number" placeholder="Serial" prefix={<span>#</span>} />
      </Form.Item>

      <Form.Item
        name="title"
        rules={[{ required: true, message: "Module title is required" }]}
      >
        <Input placeholder="Module title" />
      </Form.Item>

      <Form.Item>
        <div className="flex items-center gap-2">
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add Module
          </Button>
          <span>Or</span>
          <Button onClick={() => setIsUploadJson(true)} htmlType="button">
            Upload JSON
          </Button>
        </div>
      </Form.Item>
      {/* json upload modal  */}
      <JSONUploaderModel
        open={isUploadJson}
        setOpen={setIsUploadJson}
        setUploadedModules={setModules}
      />
    </Form>
  );
};

export default NewModuleForm;
