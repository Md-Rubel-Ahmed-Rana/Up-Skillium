import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import buildPathToKeyMap from "@/utils/buildPathToKeyMapSidebar";
import { Menu } from "antd/lib";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import {
  adminSidebarItems,
  instructorSidebarItems,
  studentSidebarItems,
} from "./sidebarItems";

const Layout: any = dynamic(() => import("antd").then((mod) => mod.Layout), {
  ssr: false,
});

const { Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const TestDashboardLayout: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [collapsed, setCollapsed] = useState(false);

  const currentSidebar =
    user?.role?.name === "admin"
      ? adminSidebarItems
      : user.role.name === "student"
      ? studentSidebarItems
      : instructorSidebarItems;

  const router = useRouter();
  const pathToKeyMap = buildPathToKeyMap(currentSidebar);
  const selectedKey = pathToKeyMap[router.pathname] || "1";

  return (
    <Layout hasSider>
      <Sider
        style={siderStyle}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-white pt-4"
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          items={currentSidebar}
        />
      </Sider>
      <Layout>
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: 0, padding: 0, overflow: "initial" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TestDashboardLayout;
