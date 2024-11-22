import { useUpdateLessonMutation } from "@/features/lesson";
import { IGetLesson as IAssignment } from "@/types/lesson.type";
import { Button, Form, Input, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  assignment: IAssignment;
};

const UpdateAssignmentModal = ({ assignment }: Props) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editLesson, { isLoading }] = useUpdateLessonMutation();

  const handleUpdateAssignment = async () => {
    try {
      const result: any = await editLesson({
        lessonId: lesson?.id,
        data: { ...lesson, title: editedTitle, module: lesson?.module?.id },
      });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Lesson updated successfully!");
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to updated lesson."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to updated lesson. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Modal
        open={open}
        footer={false}
        onCancel={() => setOpen(false)}
        title="Update Assignment"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateAssignment}
          className="lg:px-5 lg:pb-3 lg:shadow-md rounded-md"
        >
          <Form.Item
            label="Title"
            name="title"
            className="w-full"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Please enter lesson title" />
          </Form.Item>
          <Form.Item className="mt-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-blue-500 hover:bg-blue-600"
              iconPosition="end"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Quiz lesson"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAssignmentModal;
