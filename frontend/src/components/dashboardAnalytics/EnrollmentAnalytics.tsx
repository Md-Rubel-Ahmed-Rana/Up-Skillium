import { useGetEnrollmentAnalyticsQuery } from "@/features/enrollment";
import { IEnrollmentAnalytics } from "@/types/enrollment.type";
import { Card, Col, Row, Skeleton, Statistic, Typography } from "antd/lib";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EnrollmentAnalytics = () => {
  const { data, isLoading } = useGetEnrollmentAnalyticsQuery({});
  const enrollments = data?.data as IEnrollmentAnalytics;

  return (
    <div style={{ padding: 20 }}>
      {isLoading || !enrollments ? (
        <Skeleton active />
      ) : (
        <>
          <Typography.Title level={3}>
            Enrollments Analytics Summary
          </Typography.Title>
          {/* Summary Stats */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Enrollments"
                  value={enrollments.totalEnrollments}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Revenue"
                  value={enrollments.totalRevenue}
                  prefix="$"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Successful Enrollments"
                  value={enrollments.successCount}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Failed Enrollments"
                  value={enrollments.failedCount}
                  valueStyle={{ color: "#ff4d4f" }}
                />
              </Card>
            </Col>
          </Row>
          {/* Line Chart */}
          <Card
            title="Enrollments & Revenue Over Time"
            style={{ marginTop: 24 }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={enrollments.enrollmentsByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1890ff"
                  name="Enrollments"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}
    </div>
  );
};

export default EnrollmentAnalytics;
