import React, { ReactNode } from "react";
import { Layout } from "antd/lib";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
const { Content, Sider } = Layout;

type DashboardLayoutProps = {
  children?: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Layout hasSider>
      <Sider className="bg-white">
        <DashboardSidebar />
      </Sider>
      <Layout>
        <Content className="max-h-screen h-full overflow-y-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
