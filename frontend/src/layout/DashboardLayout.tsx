import React, { ReactNode } from "react";
import { Layout } from "antd/lib";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useMediaQuery } from "react-responsive";
const { Content, Sider } = Layout;

type DashboardLayoutProps = {
  children?: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  return (
    <Layout className="lg:mt-2" hasSider={isLargeDevice}>
      <Sider
        style={{ display: isLargeDevice ? "block" : "none" }}
        className="bg-white"
      >
        <DashboardSidebar />
      </Sider>
      <Layout className="bg-white ">
        <Content className="max-h-screen h-full  overflow-y-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
