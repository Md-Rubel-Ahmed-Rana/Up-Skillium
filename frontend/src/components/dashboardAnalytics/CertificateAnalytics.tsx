import { useGetCertificatesAnalyticsQuery } from "@/features/certificate";
import { ICertificateAnalytics } from "@/types/certificate.type";
import { Card, Col, Row, Spin, Typography } from "antd/lib";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Title, Text } = Typography;

const CertificateAnalytics = () => {
  const { data, isLoading } = useGetCertificatesAnalyticsQuery({});
  const analytics = data?.data as ICertificateAnalytics;

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!analytics) {
    return <div>No analytics data available.</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Title level={3}>Certificate Analytics</Title>
        </Col>

        {/* Summary Cards */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Title level={4}>Total Certificates</Title>
            <Text strong style={{ fontSize: 24 }}>
              {analytics.totalCertificates}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Title level={4}>Average Score</Title>
            <Text strong style={{ fontSize: 24 }}>
              {analytics.averageScore}%
            </Text>
          </Card>
        </Col>

        {/* Top Technologies Bar Chart */}
        <Col xs={24} md={12}>
          <Card title="Top Technologies">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={analytics.topTechnologies.map((t) => ({
                  ...t,
                  name: t.name.trim(),
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Top Courses Bar Chart */}
        <Col xs={24} md={12}>
          <Card title="Top Courses">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={analytics.topCourses}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CertificateAnalytics;
