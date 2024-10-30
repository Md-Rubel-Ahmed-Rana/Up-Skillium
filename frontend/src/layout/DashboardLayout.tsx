import React, { ReactNode } from "react";
import { FaUserCircle } from "react-icons/fa";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd/lib";
const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider className="bg-white pt-20" style={siderStyle}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sidebarItems}
        />
      </Sider>
      <Layout style={{ marginInlineStart: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="min-h-screen"
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
