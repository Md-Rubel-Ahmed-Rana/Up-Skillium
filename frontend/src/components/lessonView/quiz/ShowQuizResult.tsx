import { useGetSubmittedQuizResultQuery } from "@/features/quizSubmission";
import { IQuizSubmissionResult } from "@/types/quizSubmission.type";
import { Card, Typography, Button, Space } from "antd/lib";
import { useState } from "react";
import ShowQuizAnswers from "./ShowQuizAnswers";

const { Text, Title } = Typography;

type Props = {
  lessonId: string;
};

const ShowQuizResult = ({ lessonId }: Props) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const { data } = useGetSubmittedQuizResultQuery({ lessonId });
  const result = data?.data as IQuizSubmissionResult;

  return (
    <Card
      title={
        <Title level={3} style={{ textAlign: "center", color: "#333" }}>
          Quiz Results
        </Title>
      }
      bordered={false}
      style={{
        width: "100%",
        margin: "20px auto",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card bordered={false} style={{ backgroundColor: "#E6F7FF" }}>
          <Space
            direction="horizontal"
            size="large"
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            <Text style={{ color: "#1890ff" }}>Total Quiz:</Text>
            <Text strong style={{ fontSize: "1.2em", color: "#096dd9" }}>
              {result?.totalQuiz}
            </Text>
          </Space>
        </Card>
        <Card bordered={false} style={{ backgroundColor: "#F6FFED" }}>
          <Space
            direction="horizontal"
            size="large"
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            <Text style={{ color: "#52c41a" }}>Correct Answers:</Text>
            <Text strong style={{ fontSize: "1.2em", color: "#389e0d" }}>
              {result?.correctAnswers}
            </Text>
          </Space>
        </Card>
        <Card bordered={false} style={{ backgroundColor: "#FFF2F0" }}>
          <Space
            direction="horizontal"
            size="large"
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            <Text style={{ color: "#f5222d" }}>Wrong Answers:</Text>
            <Text strong style={{ fontSize: "1.2em", color: "#cf1322" }}>
              {result?.wrongAnswers}
            </Text>
          </Space>
        </Card>
      </Space>
      <div style={{ textAlign: "center", margin: "20px 0px" }}>
        <Button onClick={() => setShowAnswers((prev) => !prev)} type="primary">
          {`${showAnswers ? "Hide" : "Show"} Answers`}
        </Button>
      </div>
      {showAnswers && <ShowQuizAnswers answers={result?.modifiedQuizAnswers} />}
    </Card>
  );
};

export default ShowQuizResult;
