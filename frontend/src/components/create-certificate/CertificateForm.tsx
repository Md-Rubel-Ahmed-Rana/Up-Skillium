import { Button, Form, Input, InputNumber } from "antd/lib";
import { useEffect } from "react";

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

  const handleFormSubmit = (values: any) => {
    const formData = {
      certificatePdfData: {
        studentName: values.studentName,
        courseName: values.courseName,
        technologies: values.technologies,
        score: values.score,
      },
      schema: {
        user: selectedStudent.id,
        course: selectedCourse.id,
      },
    };
    console.log("Form Data:", formData);
  };

  useEffect(() => {
    form.setFieldsValue({
      studentName: selectedStudent?.name,
      courseName: selectedCourse?.name,
      technologies: selectedCourse?.technologies.join(", "),
    });
  }, [selectedStudent, selectedCourse, form]);

  return (
    <div className="border w-full p-5 rounded-md">
      <h2 className="text-2xl font-semibold mb-5">Create Certificate</h2>
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
          >
            Generate Certificate
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CertificateForm;
