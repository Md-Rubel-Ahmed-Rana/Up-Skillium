import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
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
} from "react-icons/fa";

const StudentSidebar = () => {
  const defaultItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <FaUserCircle />,
      label: <Link href={"/dashboard/profile"}>Profile</Link>,
    },
    {
      key: "2",
      icon: <FaBook />,
      label: <Link href={"/dashboard/student/my-courses"}>My Courses</Link>,
    },
    {
      key: "3",
      icon: <FaVideo />,
      label: "Live Classes",
    },
    {
      key: "4",
      icon: <FaCertificate />,
      label: "Certificates",
    },
    {
      key: "5",
      icon: <FaChartLine />,
      label: "Progress",
    },
    {
      key: "6",
      icon: <FaCommentDots />,
      label: "Discussions",
    },
    {
      key: "7",
      icon: <FaCog />,
      label: "Settings",
    },
    {
      key: "8",
      icon: <FaSignOutAlt />,
      label: "Logout",
    },
  ];

  return (
    <Menu
      theme="light"
      className="w-full min-h-screen h-full   mt-3"
      defaultSelectedKeys={["1"]}
      items={defaultItems}
    />
  );
};

export default StudentSidebar;
