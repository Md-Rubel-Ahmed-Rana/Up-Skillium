import { useCreateCertificateMutation } from "@/features/certificate";
import { ICreateCertificate } from "@/types/certificate.type";
import { Button, Form, Input, InputNumber } from "antd/lib";
import { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  selectedStudent: { id: string; name: string };
  selectedCourse: {
    id: string;
    name: string;
    technologies: string[];
  };
};

const CertificateForm = ({ selectedCourse, selectedStudent }: Props) => {
  const [form] = Form.useForm();
  const [createCertificate, { isLoading }] = useCreateCertificateMutation();

  const handleFormSubmit = async (values: any) => {
    const formData: ICreateCertificate = {
      certificatePdfData: {
        studentName: values.studentName,
        courseName: values.courseName,
        technologies: values.technologies,
        score: values?.score,
      },
      schema: {
        user: selectedStudent?.id,
        course: selectedCourse?.id,
      },
    };
    console.log(formData);
    // await handleCreateCertificate(formData);
  };

  const handleCreateCertificate = async (data: ICreateCertificate) => {
    try {
      const result: any = await createCertificate(data);
      if (result?.data?.statusCode === 201) {
        toast.success(
          result?.data?.message || "Certificate created successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to create certificate."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create certificate. Error: ${error?.message}`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      studentName: selectedStudent?.name,
      courseName: selectedCourse?.name,
      technologies: selectedCourse?.technologies.join(", "),
    });
  }, [selectedStudent, selectedCourse, form]);

  return (
    <div className="border w-full lg:p-5 p-2 rounded-md">
      <h2 className="text-lg lg:text-2xl font-semibold mb-5">
        Create Certificate
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          studentName: selectedStudent?.name,
          courseName: selectedCourse?.name,
          technologies: selectedCourse?.technologies.join(", "),
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
            {isLoading ? "Generating..." : " Generate Certificate"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CertificateForm;
