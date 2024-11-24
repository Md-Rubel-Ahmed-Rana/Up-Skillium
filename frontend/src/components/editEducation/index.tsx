import {
  useGetSingleEducationQuery,
  useUpdateEducationMutation,
} from "@/features/education";
import { IEducation } from "@/types/education.type";
import { Button, Checkbox, DatePicker, Form, Input } from "antd/lib";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditEducation = () => {
  const { query, back } = useRouter();
  const id = query.id as string;
  const { data, isLoading } = useGetSingleEducationQuery({ id });
  const education = data?.data as IEducation;

  const [form] = Form.useForm();
  const [isCurrent, setIsCurrent] = useState(false);

  const [updateEducation, { isLoading: isUpdating }] =
    useUpdateEducationMutation();

  useEffect(() => {
    if (education) {
      form.setFieldsValue({
        ...education,
        startDate: education?.startDate ? dayjs(education?.startDate) : null,
        endDate: education?.endDate ? dayjs(education?.endDate) : null,
      });
      setIsCurrent(education.isCurrent);
    }
  }, [education, form]);

  const handleUpdateEducation = async (values: any) => {
    const updatedEducation: IEducation = {
      ...values,
      startDate: values?.startDate?.toDate() || null,
      endDate: values?.endDate?.toDate() || null,
    };

    try {
      const result: any = await updateEducation({
        id: education?.id,
        data: updatedEducation,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Education updated successfully!"
        );
        form.resetFields();
        setIsCurrent(false);
        back();
      } else {
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
    <div className="mt-3 pb-20">
      <h2 className="text-lg font-semibold mb-4">Edit Education</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateEducation}
        className="space-y-4 border rounded-md p-4 bg-white shadow-md"
      >
        <Form.Item
          label="Institution"
          name="institution"
          rules={[{ required: true, message: "Institution is required" }]}
        >
          <Input type="text" placeholder="Enter your institution name" />
        </Form.Item>

        <Form.Item
          label="Degree"
          name="degree"
          rules={[{ required: true, message: "Degree is required" }]}
        >
          <Input placeholder="Enter your degree title" />
        </Form.Item>

        <Form.Item
          label="Field of Study"
          name="fieldOfStudy"
          rules={[{ required: true, message: "Field of Study is required" }]}
        >
          <Input placeholder="Enter your field of study" />
        </Form.Item>

        <Form.Item
          name="isCurrent"
          valuePropName="checked"
          className="flex items-center"
        >
          <Checkbox onChange={(e) => setIsCurrent(e.target.checked)}>
            Currently Studying Here
          </Checkbox>
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Start Date is required" }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            className="w-full"
            placeholder="Select start date"
          />
        </Form.Item>

        {!isCurrent && (
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "End Date is required when not current",
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              className="w-full"
              placeholder="Select end date"
            />
          </Form.Item>
        )}

        <Form.Item label="Description" name="description">
          <Input.TextArea
            placeholder="Enter a brief description of your education"
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between">
            <Button
              onClick={() => back()}
              disabled={isUpdating}
              type="default"
              htmlType="button"
            >
              Back
            </Button>
            <Button
              loading={isUpdating}
              disabled={isUpdating}
              iconPosition="end"
              type="primary"
              htmlType="submit"
            >
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditEducation;
