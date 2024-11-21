import { useCreateVideoLessonMutation } from "@/features/lesson";
import { ICreateLesson } from "@/types/lesson.type";
import { UploadOutlined } from "@ant-design/icons/lib";
import { Form, InputNumber, Upload } from "antd/lib";
import { useRouter } from "next/router";
import CreateLessonCommonFields from "./CreateLessonCommonFields";
import CreateLessonFormWrapper from "./CreateLessonFormWrapper";

const AssignmentOrInstructionForm = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const moduleId = query?.moduleId as string;
  const type = query?.type as "video" | "quiz" | "assignment" | "instruction";
  const [createLesson, { isLoading }] = useCreateVideoLessonMutation();

  const handleSubmitLesson = (values: any): ICreateLesson => {
    const formData = new FormData();
    const newLesson: Record<any, any> = {
      title: values?.title,
      serial: values?.serial,
      module: moduleId,
      type: type,
      videoLength: values?.videoLength,
      video: values?.video[0]?.originFileObj as File,
    };
    for (const key in newLesson) {
      const value = newLesson[key];

      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        formData.append(key, value);
      }
    }
    return formData;
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
          label="Video length (Minutes)"
          name="videoLength"
          className="w-full"
          rules={[{ required: true, message: "Video length is required" }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Please enter video length"
          />
        </Form.Item>
        <Form.Item
          label="Lesson video"
          name="video"
          valuePropName="fileList"
          className="w-full"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload video" }]}
        >
          <Upload
            accept="video/*"
            maxCount={1}
            listType="picture-card"
            className="w-full"
            beforeUpload={() => false}
          >
            <UploadOutlined className="text-3xl text-blue-500" />
          </Upload>
        </Form.Item>
      </CreateLessonFormWrapper>
    </div>
  );
};

export default AssignmentOrInstructionForm;
