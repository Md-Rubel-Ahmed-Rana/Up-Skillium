import { useGetAssignmentSubmissionAnalyticsQuery } from "@/features/assignmentSubmission";
import { IAssignmentSubmissionAnalytics } from "@/types/assignmentSubmission.type";
import { Card, Col, Empty, Row, Spin, Statistic, Typography } from "antd/lib";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const { Title } = Typography;

const COLORS = ["#1890ff", "#52c41a", "#faad14", "#f5222d"];

const AssignmentSubmissionAnalytics = () => {
  const { data, isLoading } = useGetAssignmentSubmissionAnalyticsQuery({});
  const analytics = data?.data as IAssignmentSubmissionAnalytics;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!analytics) {
    return <Empty description="No analytics data available" />;
  }

  const submissionData = [
    { name: "Checked", value: analytics.totalChecked },
    { name: "On Time", value: analytics.totalOnTime },
    { name: "Pending", value: analytics.totalPending },
    { name: "Late", value: analytics.totalLate },
  ];

  return (
    <div className="p-4">
      <Title level={3}>Assignment Submission Analytics</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Submissions"
              value={analytics.totalSubmissions}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Checked Submissions"
              value={analytics.totalChecked}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pending Submissions"
              value={analytics.totalPending}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Late Submissions" value={analytics.totalLate} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="On-Time Submissions"
              value={analytics.totalOnTime}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Average Mark"
              value={analytics.averageMark ?? "N/A"}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Average Full Mark"
              value={analytics.averageFullMark ?? "N/A"}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Submission Status Breakdown">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={submissionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {submissionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AssignmentSubmissionAnalytics;
