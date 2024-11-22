import { ICreateLesson } from "@/types/lesson.type";
import handleValidationErrors from "@/utils/handleValidationErrors";
import { TypedMutationTrigger } from "@reduxjs/toolkit/query/react";
import { Button, Form, FormInstance } from "antd/lib";
import toast from "react-hot-toast";

type Props = {
  form: FormInstance;
  children: any;
  isLoading: boolean;
  createLessonHook: TypedMutationTrigger<any, any, any>;
  createLessonSubmitter: (value: ICreateLesson) => ICreateLesson;
};

const CreateLessonFormWrapper = ({
  form,
  children,
  isLoading,
  createLessonHook,
  createLessonSubmitter,
}: Props) => {
  const handleSubmitLesson = async (values: any) => {
    const lesson = createLessonSubmitter(values);
    try {
      const result: any = await createLessonHook({ data: lesson });
      if (result?.data?.statusCode === 201) {
        toast.success(result?.data?.message || "lesson created successfully!");
        form.resetFields();
      } else {
        handleValidationErrors(result);
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to create lesson."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create lesson. Error: ${error?.message}`);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmitLesson}
      className="space-y-6"
    >
      {children}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full bg-blue-500 hover:bg-blue-600"
          iconPosition="end"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create lesson"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateLessonFormWrapper;
