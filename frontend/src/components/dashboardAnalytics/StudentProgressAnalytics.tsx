import { useGetStudentCourseProgressAnalyticsQuery } from "@/features/myCourse";
import { ICourseProgressAnalytics } from "@/types/myCourse.type";
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

const StudentProgressAnalytics = () => {
  const { data, isLoading } = useGetStudentCourseProgressAnalyticsQuery({});
  const analytics = data?.data as ICourseProgressAnalytics;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4">
      {analytics ? (
        <>
          <Title level={3}>Student Course Progress Analytics</Title>

          <Row gutter={16} className="mb-6">
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Enrolled"
                  value={analytics?.totalEnrolled || 0}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="In Progress"
                  value={analytics?.totalInProgress || 0}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Completed"
                  value={analytics?.totalCompleted || 0}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Avg. Completion (%)"
                  value={analytics?.averageCompletionPercentage || 0}
                  precision={1}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>

          <Card title="Per Course Completion" className="mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.perCourseStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="courseId" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="avgCompletion"
                  fill="#1890ff"
                  name="Avg. Completion %"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </>
      ) : (
        <div>No analytic found</div>
      )}
    </div>
  );
};

export default StudentProgressAnalytics;
