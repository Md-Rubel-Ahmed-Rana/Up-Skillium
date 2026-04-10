import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import buildPathToKeyMap from "@/utils/buildPathToKeyMapSidebar";
import { Layout, Menu } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { FaHome } from "react-icons/fa";
import DashboardHeader from "./DashboardHeader";
import {
  adminSidebarItems,
  instructorSidebarItems,
  studentSidebarItems,
} from "./sidebarItems";

const { Content, Sider } = Layout;

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [collapsed, setCollapsed] = useState(false);

  const currentSidebar: any =
    user?.role?.name === "admin"
      ? adminSidebarItems
      : user?.role?.name === "student"
      ? studentSidebarItems
      : instructorSidebarItems;

  const router = useRouter();
  const pathToKeyMap = buildPathToKeyMap(currentSidebar);
  const selectedKey = pathToKeyMap[router.pathname] || "1";

  const sidebarClone = [...currentSidebar];

  sidebarClone.unshift({
    key: "1-1",
    icon: <FaHome />,
    label: <Link href="/">Back Home</Link>,
  });

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-white pt-4"
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          items={sidebarClone}
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

export default DashboardLayout;
