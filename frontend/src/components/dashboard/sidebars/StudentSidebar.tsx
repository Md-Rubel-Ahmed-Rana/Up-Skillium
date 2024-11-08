import LogoutButton from "@/components/shared/LogoutButton";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  FaUserCircle,
  FaBook,
  FaVideo,
  FaCertificate,
  FaCog,
  FaChartLine,
  FaCommentDots,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

const StudentSidebar = () => {
  const router = useRouter();

  const pathToKeyMap: { [key: string]: string } = {
    "/dashboard": "0",
    "/dashboard/profile": "1",
    "/dashboard/my-courses": "2",
    "/dashboard/live-classes": "3",
    "/dashboard/certificates": "4",
    "/dashboard/progress": "5",
    "/dashboard/discussions": "6",
    "/dashboard/settings": "7",
  };

  const selectedKey = pathToKeyMap[router.pathname] || "1";

  const defaultItems: MenuProps["items"] = [
    {
      key: "0",
      icon: <FaTachometerAlt />,
      label: <Link href={"/dashboard"}>Dashboard</Link>,
    },
    {
      key: "1",
      icon: <FaUserCircle />,
      label: <Link href={"/dashboard/profile"}>Profile</Link>,
    },
    {
      key: "2",
      icon: <FaBook />,
      label: (
        <Link className="" href={"/dashboard/my-courses"}>
          My Courses
        </Link>
      ),
    },
    {
      key: "3",
      icon: <FaVideo />,
      label: <Link href={"/dashboard/live-classes"}>Live Classes</Link>,
    },
    {
      key: "4",
      icon: <FaCertificate />,
      label: <Link href={"/dashboard/certificates"}>Certificates</Link>,
    },
    {
      key: "5",
      icon: <FaChartLine />,
      label: <Link href={"/dashboard/progress"}>Progress</Link>,
    },
    {
      key: "6",
      icon: <FaCommentDots />,
      label: <Link href={"/dashboard/discussions"}>Discussions</Link>,
    },
    {
      key: "7",
      icon: <FaCog />,
      label: <Link href={"/dashboard/settings"}>Settings</Link>,
    },
    {
      key: "8",
      icon: <FaSignOutAlt />,
      label: <LogoutButton />,
    },
  ];

  return (
    <Menu
      theme="light"
      className="w-full lg:min-h-screen h-full mt-3 flex lg:flex-col flex-row overflow-x-auto lg:overflow-visible space-x-3 lg:space-x-0"
      selectedKeys={[selectedKey]}
      items={defaultItems}
    />
  );
};

export default StudentSidebar;
