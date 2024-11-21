import { useCreateAssignmentOrInstructionLessonMutation } from "@/features/lesson";
import {
  ICreateAssignmentOrInstructionLesson,
  ICreateLesson,
} from "@/types/lesson.type";
import { Form } from "antd/lib";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CreateLessonCommonFields from "./CreateLessonCommonFields";
import CreateLessonFormWrapper from "./CreateLessonFormWrapper";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AssignmentOrInstructionForm = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const moduleId = query?.moduleId as string;
  const type = query?.type as "video" | "quiz" | "assignment" | "instruction";
  const [createLesson, { isLoading }] =
    useCreateAssignmentOrInstructionLessonMutation();

  const handleSubmitLesson = (values: any): ICreateLesson => {
    const newLesson: ICreateAssignmentOrInstructionLesson = {
      title: values?.title,
      serial: values?.serial,
      content: values?.content,
      module: moduleId,
      type: type,
    };
    return newLesson;
  };

  return (
    <div className="w-full max-w-xl mx-auto border shadow-md p-5 rounded-md">
      <h2 className="text-xl font-extrabold text-center">
        Create {type} lesson
      </h2>
      <CreateLessonFormWrapper
        form={form}
        isLoading={isLoading}
        createLessonHook={createLesson}
        createLessonSubmitter={handleSubmitLesson}
      >
        <CreateLessonCommonFields />
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Lesson content is required" }]}
        >
          <ReactQuill
            theme="snow"
            placeholder="Write your lesson content here..."
            className="bg-white rounded-lg shadow-sm"
            onChange={(value) => form.setFieldValue("content", value)}
          />
        </Form.Item>
      </CreateLessonFormWrapper>
    </div>
  );
};

export default AssignmentOrInstructionForm;
