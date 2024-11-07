import { IQuizAnswer } from "@/types/quizSubmission.type";
import { Card, Typography, Space } from "antd/lib";

const { Text, Title } = Typography;

type Props = {
  answers: IQuizAnswer[];
};

const ShowQuizAnswers = ({ answers }: Props) => {
  return (
    <div className="p-2 border rounded-lg shadow-md w-full">
      <Title level={3} className="text-center text-gray-800 my-3">
        Quiz Answers
      </Title>
      <Space direction="vertical" size="large" className="w-full">
        {answers.map((answer, index) => (
          <Card
            key={index}
            bordered={false}
            className={`p-4 rounded-lg ${
              answer.isCorrect
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-red-100 border-l-4 border-red-500"
            }`}
          >
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex items-center gap-2">
                <Text className="text-gray-800 font-medium">Question:</Text>
                <Text className="text-gray-600">{answer.question}</Text>
              </div>
              <div className="flex items-center gap-2">
                <Text className="text-gray-800 font-medium">Your Answer:</Text>
                <Text
                  className={`${
                    answer.isCorrect ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {answer.givenAnswer}
                </Text>
              </div>

              <div className="flex items-center gap-2">
                <Text className="text-gray-800 font-medium">
                  Correct Answer:
                </Text>
                <Text className="text-blue-600 font-semibold">
                  {answer.correctAnswer}
                </Text>
              </div>
            </Space>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default ShowQuizAnswers;
