import { useGetLoggedInUserQuery } from "@/features/auth";
import {
  useAddEducationMutation,
  useUpdateEducationMutation,
} from "@/features/education";
import { ICreateEducation, IEducation } from "@/types/education.type";
import { IUser } from "@/types/user.type";
import handleValidationErrors from "@/utils/handleValidationErrors";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd/lib";
import toast from "react-hot-toast";

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
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [addEducation, { isLoading: isAdding }] = useAddEducationMutation();
  const [editEducation, { isLoading: isEditing }] =
    useUpdateEducationMutation();

  const handleSubmitEducation = (values: IEducation) => {
    if (actionType === "add") {
      handleAddEducation({
        institute: values?.institute,
        degree: values?.degree,
        status: values?.status,
        end: values?.end,
        start: values?.start,
        user: user?.id,
      });
    } else {
      handleUpdateEducation({
        ...education,
        institute: values?.institute,
        degree: values?.degree,
        status: values?.status,
        end: values?.end,
        start: values?.start,
      } as IEducation);
    }
  };

  const handleAddEducation = async (data: ICreateEducation) => {
    try {
      const result: any = await addEducation({ data });
      if (result?.data?.statusCode === 201) {
        toast.success(result?.data?.message || "Education added successfully!");
        setOpen(false);
      } else {
        handleValidationErrors(result);
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to add education."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to add education. Error: ${error?.message}`);
    }
  };

  const handleUpdateEducation = async (data: IEducation) => {
    try {
      const result: any = await editEducation({
        id: education?.id as string,
        data,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Education updated successfully!"
        );
        setOpen(false);
      } else {
        handleValidationErrors(result);
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to edit education."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to edit education. Error: ${error?.message}`);
    }
  };

  return (
    <Modal
      title={`${actionType === "add" ? "Add" : "Edit"} education`}
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      maskClosable={!isAdding || !isEditing}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitEducation}
        className="space-y-2"
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
        <div className="flex items-center flex-col lg:flex-row justify-between gap-2">
          <Form.Item
            label="Status"
            name="status"
            className="w-full"
            rules={[{ required: true, message: "status is required" }]}
          >
            <Select
              className="w-full"
              value={education?.status || "passed"}
              placeholder="Select status"
            >
              <Select.Option value={"passed"}>Passed</Select.Option>
              <Select.Option value={"studying"}>Studying</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            className="w-full"
            label="Start"
            name="start"
            rules={[{ required: true, message: "Start date is required" }]}
          >
            <DatePicker
              name="start"
              className="w-full"
              placeholder="Select start date"
            />
          </Form.Item>
          <Form.Item className="w-full" label="End" name="end">
            <DatePicker
              name="end"
              className="w-full"
              placeholder="Select end date"
            />
          </Form.Item>
        </div>
        <Form.Item>
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setOpen(false)}
              type="default"
              htmlType="button"
              size="large"
              disabled={isAdding || isEditing}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              iconPosition="end"
              disabled={isAdding || isEditing}
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
