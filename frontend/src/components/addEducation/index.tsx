import { useGetLoggedInUserQuery } from "@/features/auth";
import { useAddEducationMutation } from "@/features/education";
import { ICreateEducation } from "@/types/education.type";
import { IUser } from "@/types/user.type";
import { Button, Checkbox, DatePicker, Form, Input } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const AddEducation = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [form] = Form.useForm<ICreateEducation>();
  const router = useRouter();
  const [isCurrent, setIsCurrent] = useState(false);
  const [addNewEducation, { isLoading }] = useAddEducationMutation();

  const handleAddEducation = async (values: any) => {
    const newEducation: ICreateEducation = {
      ...values,
      startDate: values?.startDate?.toDate() || null,
      endDate: values?.endDate?.toDate() || null,
      user: user?.id,
    };

    try {
      const result: any = await addNewEducation({ data: newEducation });
      if (result?.data?.statusCode === 201) {
        toast.success(result?.data?.message || "Education added successfully!");
        form.resetFields();
        setIsCurrent(false);
        router.back();
      } else {
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

  return (
    <div className="mt-3 pb-20">
      <h2 className="text-lg font-semibold mb-4">Add Education</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddEducation}
        className="space-y-4 border rounded-md p-2"
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
          <Checkbox onChange={(e) => setIsCurrent(e.target.checked as boolean)}>
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
          <Form.Item label="End Date" name="endDate">
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
              onClick={() => router.back()}
              disabled={isLoading}
              type="default"
              htmlType="button"
            >
              Back
            </Button>
            <Button
              disabled={isLoading}
              loading={isLoading}
              iconPosition="end"
              type="primary"
              htmlType="submit"
            >
              {isLoading ? "Adding..." : "Add Education"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEducation;
