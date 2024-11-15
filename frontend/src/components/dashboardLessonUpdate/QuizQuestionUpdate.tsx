import { useUpdateLessonQuizQuestionsMutation } from "@/features/lesson";
import { IQuizQuestion } from "@/types/quiz.type";
import { Button, Collapse, Form, Input, Space } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const { Panel } = Collapse;

type Props = {
  questions: IQuizQuestion[];
};

const QuizQuestionUpdate = ({ questions }: Props) => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const lessonId = query?.lessonId as string;
  const [updateQuestions, { isLoading }] =
    useUpdateLessonQuizQuestionsMutation();

  const handleFinish = async (updatedQuestions: {
    questions: IQuizQuestion[];
  }) => {
    const allQuestions = updatedQuestions.questions;
    const oldQuizzes: IQuizQuestion[] = [];
    const newQuizzes: IQuizQuestion[] = [];

    allQuestions.forEach((question) => {
      if (question?.id) {
        oldQuizzes.push(question);
      } else {
        newQuizzes.push({ ...question, module: allQuestions[0]?.module });
      }
    });

    const finalQuestions: IQuizQuestion[] = oldQuizzes.concat(newQuizzes);

    await handleUpdateQuestions(finalQuestions);
  };

  const handleUpdateQuestions = async (quizzes: IQuizQuestion[]) => {
    try {
      const result: any = await updateQuestions({ lessonId, quizzes });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Quiz questions updated successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.data?.error?.message ||
            result?.error?.data?.message ||
            "Failed to update quiz questions"
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update quiz. Error: ${error?.message}`);
    }
  };

  return (
    <div className="lg:p-4 p-2 shadow-md rounded-md">
      <h2 className="font-semibold text-2xl mb-4">Edit Quiz</h2>
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={{ questions: questions }}
        layout="vertical"
      >
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              <Collapse accordion>
                {fields.map(({ key, name, ...restField }) => (
                  <Panel
                    key={key}
                    header={`Question ${key + 1}`}
                    className="!rounded-lg !mb-4"
                    forceRender
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "question"]}
                      label="Question"
                      rules={[
                        { required: true, message: "Question is required" },
                      ]}
                    >
                      <Input.TextArea
                        rows={2}
                        className="!rounded-md"
                        placeholder="Enter the question"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "correctAnswer"]}
                      label="Correct Answer"
                      rules={[
                        {
                          required: true,
                          message: "Correct answer is required",
                        },
                      ]}
                    >
                      <Input
                        className="!rounded-md"
                        placeholder="Enter the correct answer"
                      />
                    </Form.Item>

                    <Form.List name={[name, "options"]}>
                      {(
                        optionFields,
                        { add: addOption, remove: removeOption }
                      ) => (
                        <div>
                          <label className="block font-medium mb-1">
                            Options
                          </label>
                          {optionFields.map(
                            ({
                              key: optionKey,
                              name: optionName,
                              ...optionRestField
                            }) => (
                              <Space
                                key={optionKey}
                                align="baseline"
                                className="mb-2 flex"
                              >
                                <Form.Item
                                  {...optionRestField}
                                  name={optionName}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Option is required",
                                    },
                                  ]}
                                  className="flex-1"
                                >
                                  <Input
                                    placeholder="Enter an option"
                                    className="!rounded-md"
                                  />
                                </Form.Item>
                                <Button
                                  danger
                                  type="text"
                                  onClick={() => removeOption(optionName)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </Button>
                              </Space>
                            )
                          )}
                          <Button
                            type="dashed"
                            onClick={() => addOption()}
                            className="mt-2"
                          >
                            Add Option
                          </Button>
                        </div>
                      )}
                    </Form.List>

                    <Button
                      danger
                      type="text"
                      onClick={() => remove(name)}
                      className="mt-4 text-red-600 hover:text-red-700"
                    >
                      Remove Question
                    </Button>
                  </Panel>
                ))}
              </Collapse>
              <Button
                type="dashed"
                onClick={() => add()}
                className="mt-4 w-full"
              >
                Add Question
              </Button>
            </>
          )}
        </Form.List>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="mt-6 w-full"
          loading={isLoading}
          disabled={isLoading}
          iconPosition="end"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Form>
    </div>
  );
};

export default QuizQuestionUpdate;
