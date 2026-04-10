import { useGetUsersAnalyticsSummaryQuery } from "@/features/user";
import { IUserAnalytics } from "@/types/user.type";
import { Card, Col, Row, Spin, Statistic, Typography } from "antd/lib";
import React from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const UserAnalyticsSummary: React.FC = () => {
  const { data, isLoading } = useGetUsersAnalyticsSummaryQuery({});
  const analytics = data?.data as IUserAnalytics;

  if (isLoading || !analytics) {
    return (
      <div className="text-center my-10">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Typography.Title level={3}>User Analytics Summary</Typography.Title>

      {/* Stats Cards */}
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Users" value={analytics.totalUsers} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Users" value={analytics.activeUsers} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Inactive Users" value={analytics.inactiveUsers} />
          </Card>
        </Col>
      </Row>

      <Card title="Users Registered Over Time" style={{ marginTop: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analytics.usersByDate}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#1890ff" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Gender Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.genderDistribution}
                  dataKey="count"
                  nameKey="gender"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {analytics.genderDistribution.map((_, index) => (
                    <Cell
                      key={`gender-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Role Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.roleDistribution}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {analytics.roleDistribution.map((_, index) => (
                    <Cell
                      key={`role-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserAnalyticsSummary;
