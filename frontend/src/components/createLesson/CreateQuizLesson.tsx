import { useCreateQuizLessonMutation } from "@/features/lesson";
import { ICreateQuizLesson } from "@/types/lesson.type";
import { Form, Input } from "antd/lib";
import { useRouter } from "next/router";
import CreateLessonCommonFields from "./CreateLessonCommonFields";
import CreateLessonFormWrapper from "./CreateLessonFormWrapper";
import CreateQuizQuestions from "./CreateQuizQuestions";

const CreateQuizLesson = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const moduleId = query?.moduleId as string;
  const [createLesson, { isLoading }] = useCreateQuizLessonMutation();

  const handleSubmitLesson = (values: any): ICreateQuizLesson => {
    const quizLesson: ICreateQuizLesson = {
      ...values,
      type: "quiz",
      module: moduleId,
      quizQuestions: values?.quizQuestions?.map((ques: any) => ({
        ...ques,
        module: moduleId,
      })),
    };
    return quizLesson;
  };

  return (
    <div className="w-full max-w-2xl mx-auto border shadow-md p-5 rounded-md">
      <h2 className="text-xl font-extrabold text-center">Create quiz lesson</h2>
      <CreateLessonFormWrapper
        form={form}
        isLoading={isLoading}
        createLessonHook={createLesson}
        createLessonSubmitter={handleSubmitLesson}
      >
        <CreateLessonCommonFields />
        <Form.Item
          label="Description"
          name="content"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input placeholder="Please enter lesson title" />
        </Form.Item>
        <CreateQuizQuestions form={form} />
      </CreateLessonFormWrapper>
    </div>
  );
};

export default CreateQuizLesson;
