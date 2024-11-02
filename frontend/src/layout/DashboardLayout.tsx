import React, { ReactNode } from "react";
import { FaUserCircle } from "react-icons/fa";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd/lib";
const { Content, Sider } = Layout;

const defaultItems: MenuProps["items"] = [FaUserCircle].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `Item ${index + 1}`,
}));

type DashboardLayoutProps = {
  sidebarItems?: MenuProps["items"];
  children?: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebarItems = defaultItems,
  children,
}) => {
  return (
    <Layout style={{ padding: "0px", margin: "0px" }} hasSider>
      <Sider style={{ padding: "0px", margin: "0px" }} className="bg-white">
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sidebarItems}
        />
      </Sider>
      <Layout style={{ padding: "0px", margin: "0px" }}>
        <Content style={{ padding: "0px", margin: "0px" }}>
          <div className="w-full h-full">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
