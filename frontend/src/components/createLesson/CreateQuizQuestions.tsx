import { Button, Collapse, Form, Input, Space } from "antd/lib";

const { Panel } = Collapse;

const CreateQuizQuestions = () => {
  return (
    <div className="p-2 border rounded-md">
      <h2 className="font-semibold text-lg mb-2">Create questions</h2>
      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            <Collapse accordion>
              {fields.map(({ key, name, ...restField }) => (
                <Panel key={key} header={`Question ${key + 1}`} forceRender>
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
            <Button type="dashed" onClick={() => add()} className="mt-4 w-full">
              Add Question
            </Button>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default CreateQuizQuestions;
