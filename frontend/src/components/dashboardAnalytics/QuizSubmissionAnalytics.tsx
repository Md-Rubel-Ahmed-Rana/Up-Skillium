import { useGetQuizSubmissionAnalyticsQuery } from "@/features/quizSubmission";
import { IQuizSubmissionAnalytics } from "@/types/quizSubmission.type";
import { Card, Col, Row, Spin, Statistic, Typography } from "antd/lib";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const { Title } = Typography;

const QuizSubmissionAnalytics = () => {
  const { data, isLoading } = useGetQuizSubmissionAnalyticsQuery({});
  const analytics = data?.data as IQuizSubmissionAnalytics;

  if (isLoading || !analytics) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  const {
    totalSubmissions,
    totalCorrectAnswers,
    totalWrongAnswers,
    highestScore,
    lowestScore,
    averageScorePercentage,
  } = analytics;

  const answerChartData = [
    { name: "Correct", count: totalCorrectAnswers },
    { name: "Wrong", count: totalWrongAnswers },
  ];

  return (
    <div className="p-4">
      <Title level={3}>Quiz Submission Analytics</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Total Submissions" value={totalSubmissions} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Average Score (%)"
              value={averageScorePercentage.toFixed(2)}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Highest Score" value={highestScore} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Lowest Score" value={lowestScore} />
          </Card>
        </Col>
      </Row>

      <div className="mt-8">
        <Card title="Correct vs Wrong Answers">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={answerChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#1890ff" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default QuizSubmissionAnalytics;
