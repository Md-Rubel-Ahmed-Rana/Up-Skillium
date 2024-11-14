/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILesson } from "@/types/lesson.type";
import { Form, Input, Button } from "antd/lib";
import { useEffect, useState } from "react";
import { useUpdateLessonMutation } from "@/features/lesson";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Props = {
  lesson: ILesson;
};

const AssignmentLessonUpdate = ({ lesson }: Props) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [updateLesson, { isLoading }] = useUpdateLessonMutation();

  const handleUpdateVideoLesson = async (values: ILesson) => {
    const newData: ILesson = {
      ...lesson,
      title: values?.title,
      serial: Number(values?.serial),
      content: content,
    };

    try {
      const result: any = await updateLesson({
        lessonId: lesson?.id,
        data: newData,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Lesson was updated successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update lesson"
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update lesson. Error: ${error?.message}`);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  useEffect(() => {
    if (lesson) {
      form.setFieldsValue({
        title: lesson?.title,
        serial: lesson?.serial,
        content: lesson?.content,
      });
      setContent(lesson?.content);
    }
  }, [lesson, form]);

  return (
    <Form
      form={form}
      onFinish={handleUpdateVideoLesson}
      layout="vertical"
      className="space-y-4 border p-4 rounded-md"
    >
      <Form.Item
        label="Lesson Title"
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input placeholder="Enter lesson title" />
      </Form.Item>

      <Form.Item
        label="Serial"
        name="serial"
        rules={[
          { required: true, message: "Serial is required" },
          {
            type: "number",
            message: "Serial must be a number",
            transform: (value) => Number(value),
          },
        ]}
      >
        <Input type="number" placeholder="Enter lesson serial" />
      </Form.Item>
      <Form.Item label="Content" name="content">
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          theme="snow"
          placeholder="Write content here..."
          className="bg-white rounded-lg shadow-sm"
        />{" "}
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          disabled={isLoading}
          loading={isLoading}
          iconPosition="end"
          htmlType="submit"
          className="w-full"
        >
          {isLoading ? "Updating..." : " Update Lesson"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AssignmentLessonUpdate;
