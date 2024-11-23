import { IEducation } from "@/types/education.type";
import { Button, Form, Input, Modal, Select } from "antd/lib";

type Props = {
  education?: IEducation;
  actionType: "add" | "edit";
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddOrEditEducationModal = ({
  open,
  setOpen,
  education,
  actionType,
}: Props) => {
  const [form] = Form.useForm();

  const handleSubmitEducation = (values: IEducation) => {};

  return (
    <Modal
      title={`${actionType === "add" ? "Add" : "Edit"} education`}
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitEducation}
        className="space-y-6"
        initialValues={education || { institute: "", degree: "", status: "" }}
      >
        <Form.Item
          label="Institute"
          name="institute"
          rules={[{ required: true, message: "Institute is required" }]}
        >
          <Input
            placeholder="Please enter institute"
            value={education?.institute}
          />
        </Form.Item>
        <Form.Item
          label="Degree"
          name="degree"
          rules={[{ required: true, message: "Degree is required" }]}
        >
          <Input placeholder="Please enter degree" value={education?.degree} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "status is required" }]}
        >
          <Select
            value={education?.status || "passed"}
            placeholder="Select status"
          >
            <Select.Option value={"passed"}>Passed</Select.Option>
            <Select.Option value={"studying"}>Studying</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setOpen(false)}
              type="default"
              htmlType="button"
              size="large"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              iconPosition="end"
            >
              {actionType === "add" ? " Add Now" : "Save changes"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddOrEditEducationModal;
