import {
  useGetSingleCertificateQuery,
  useUpdateCertificateMutation,
} from "@/features/certificate";
import { ICertificate, IUpdateCertificate } from "@/types/certificate.type";
import { Button, Form, Input, InputNumber } from "antd/lib";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const CertificateUpdate = () => {
  const [form] = Form.useForm();
  const { query, push } = useRouter();
  const certificateId = query?.certificateId as string;
  const { data } = useGetSingleCertificateQuery({ id: certificateId });
  const certificate = data?.data as ICertificate;
  const [updateCertificate, { isLoading }] = useUpdateCertificateMutation();

  const handleFormSubmit = async (values: any) => {
    const formData: IUpdateCertificate = {
      studentName: values?.studentName,
      courseName: values?.courseName,
      technologies: values?.technologies?.split(","),
      score: values?.score,
    };
    await handleUpdateCertificate(formData);
  };

  const handleUpdateCertificate = async (data: IUpdateCertificate) => {
    try {
      const result: any = await updateCertificate({
        id: certificate?.id,
        data,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Certificate updated successfully!"
        );
        push("/dashboard/manage-certificates");
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to updated certificate."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to updated certificate. Error: ${error?.message}`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      studentName: certificate?.user?.name,
      courseName: certificate?.course?.title,
      technologies: certificate?.course?.technologies
        ? certificate?.course?.technologies.join(", ")
        : "",
      score: 0,
    });
  }, [
    form,
    certificate?.user?.name,
    certificate?.course?.title,
    certificate?.course?.technologies,
  ]);

  return (
    <div className="border w-full lg:p-5 p-2 rounded-md">
      <h2 className="text-lg lg:text-2xl font-semibold mb-5">
        Update Certificate
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          studentName: certificate?.user?.name,
          courseName: certificate?.course?.title,
          technologies: certificate?.course?.technologies
            ? certificate?.course?.technologies.join(", ")
            : "",
          score: 0,
        }}
      >
        <Form.Item
          label="Student Name"
          name="studentName"
          rules={[{ required: true, message: "Student name is required!" }]}
        >
          <Input placeholder="Enter student name" />
        </Form.Item>

        <Form.Item
          label="Course Name"
          name="courseName"
          rules={[{ required: true, message: "Course name is required!" }]}
        >
          <Input placeholder="Enter course name" />
        </Form.Item>

        <Form.Item
          label="Technologies"
          name="technologies"
          rules={[{ required: true, message: "Technologies are required!" }]}
        >
          <Input.TextArea rows={2} placeholder="Enter course technologies" />
        </Form.Item>

        <Form.Item
          label="Score (1-100)"
          name="score"
          rules={[
            { required: true, message: "Score is required!" },
            {
              type: "number",
              min: 1,
              max: 100,
              message: "Score must be between 1 and 100!",
            },
          ]}
        >
          <InputNumber min={1} max={100} className="w-full" />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
            disabled={isLoading}
            loading={isLoading}
            iconPosition="end"
          >
            {isLoading ? "Updating..." : "Update Certificate"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CertificateUpdate;
